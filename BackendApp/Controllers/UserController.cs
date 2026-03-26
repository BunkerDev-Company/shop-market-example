using CoreData.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly ShopMarketContext _context;

        public UserController(ShopMarketContext context)
        {
            _context = context;
        }

        [HttpGet("Me")]
        public async Task<IActionResult> GetMe()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User is not authorized.");
            }
            var useGuid = Guid.Parse(userIdClaim.Value);

            var user = await _context.Users.Where(x=>x.Id == useGuid).FirstOrDefaultAsync();

            if (user == null) return BadRequest(new { error = true, message = "пользователь не найден" });

            var userdto = new UserDTO()
            {
                Id = user.Id,
                Username = user.Username,
                Score = user.Score,
                Fio = user.Fio,
                Address = user.Address,
                Email = user.Email,
                Phone = user.Phone
            };

            return Ok(userdto);
        }

        [HttpPost("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDTO dto)
        {
            var user = await _context.Users.Where(x=>x.Id== dto.Id).FirstOrDefaultAsync();

            if (user == null) return BadRequest(new { error = true, message = "пользователь не найден" });

            user.Email = dto.Email;
            user.Phone = dto.Phone;
            user.Fio = dto.Fio;
            user.Username = dto.Username;
            user.UpdateDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }

    public class UserDTO
    {
        public Guid Id { get; set; }

        public string Username { get; set; } = null!;

        public long Score { get; set; }

        public string? Fio { get; set; }

        public string? Address { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
    }

    public class UserUpdateDTO
    {
        public Guid Id { get; set; }

        public string Username { get; set; } = null!;

        public string? Fio { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }
    }
}
