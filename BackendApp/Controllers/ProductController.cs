using CoreData.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopBackend.Helpers;
using System.Threading.Tasks;

namespace ShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ShopMarketContext _context;

        public ProductController(ShopMarketContext context)
        {
            _context = context;
        }

        [HttpGet("One")]
        public async Task<IActionResult> GetOneProducts(Guid id)
        {
            var _products = await _context.Products.Include(x => x.Brand).Where(x=>x.IsActive == true).ToListAsync();
            var product = _products.Where(x=>x.Id == id).Select(x=> new ProductFullDto()
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                Description = x.Description,
                Brand = x.Brand?.Name
            }).FirstOrDefault();
            if (product == null)
            {
                return BadRequest("Товара нет");
            }
            return Ok(product);
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllProduct()
        {
            var _products = await _context.Products.Include(x=>x.Brand).Where(x => x.IsActive == true).ToListAsync();
            var listProducts = _products.Select(x => new ProductCardDto()
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                Brand = x.Brand?.Name,
                Image = x.Image,
            }).ToList();
            return Ok(listProducts);
        }

        [HttpGet("CartProducts")]
        public async Task<IActionResult> GetCartProduct([FromQuery] List<Guid> ids)
        {
            var _products = await _context.Products.Include(x => x.Brand).Where(x => x.IsActive == true && ids.Contains(x.Id)).ToListAsync();
            var listProducts = _products.Select(x => new ProductCardDto()
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                Brand = x.Brand?.Name
            }).ToList();
            return Ok(listProducts);
        }
    }

    public class ProductCardDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public long Price { get; set; }
        public string? Brand { get; set; }
        public string? Image { get; set; }
    }
    public class ProductFullDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public long Price { get; set; }
        public string? Description { get; set; } = "";
        public string? Brand { get; set; }
    }

    public class ProductCartDto
    {
        public Guid Id { get; set; }
        public int Count { get; set; }
    }
}
