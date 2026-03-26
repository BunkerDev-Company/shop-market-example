using CoreData.Contexts;
using CoreData.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ShopMarketContext _context;
        private readonly IMemoryCache _cache;

        public AuthController(ShopMarketContext context, IMemoryCache cache)
        {
            _cache = cache;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> AuthUser(UserAuthDto dto) {
            try
            {
                var now = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified);
                var usr = await _context.Users.Where(x => x.Phone == dto.Phone).FirstOrDefaultAsync();

                if (usr == null)
                {
                    usr = new CoreData.Models.User()
                    {
                        Id = Guid.NewGuid(),
                        Username = dto.Phone,
                        TelegramId = 0,
                        CreateDate = now,
                        IsActive = false,
                        Phone = dto.Phone
                    };

                    await _context.Users.AddAsync(usr);
                    await _context.SaveChangesAsync();
                }

                var code = new Random().Next(1000, 9999).ToString();
                _cache.Set(dto.Phone, code, TimeSpan.FromMinutes(5));

                Console.WriteLine($"Код для {dto.Phone}: {code}");

                return Ok("Введите код");
            }
            catch (Exception ex) {
                return BadRequest(ex);
            }
        }

        [HttpPost("code")]
        public async Task<ActionResult> AuthUserCode(UserAuthCodeDto dto)
        {
            try
            {
                if (!_cache.TryGetValue(dto.Phone, out string? cachedCode))
                    return BadRequest("Код истёк или не был запрошен");

                if (cachedCode != dto.Code)
                    return BadRequest("Неверный код");

                _cache.Remove(dto.Phone);

                var usr = await _context.Users
                    .Where(x => x.Phone == dto.Phone)
                    .FirstOrDefaultAsync();

                if (usr == null)
                    return NotFound("Пользователь не найден");

                usr.IsActive = true;
                await _context.SaveChangesAsync();

                var now = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified);

                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, usr.Id.ToString())
                };

                var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(
                        AuthOptions.GetSymmetricSecurityKey(),
                        SecurityAlgorithms.HmacSha256));

                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                var response = new
                {
                    access_token = encodedJwt,
                    name = usr.Username,
                    id = usr.Id
                };

                return Content(JsonConvert.SerializeObject(response), "application/json");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public class UserAuthDto {
            public string Phone { get; set; }
        }
        public class UserAuthCodeDto
        {
            public string Code { get; set; }
            public string Phone { get; set; }
        } 
    }

}
