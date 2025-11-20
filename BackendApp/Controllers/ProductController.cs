using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopBackend.Helpers;

namespace ShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        [HttpGet("One")]
        public IActionResult GetOneProducts(int id)
        {
            var product = FakeDatabase._products.Where(x=>x.Id == id).Select(x=> new ProductFullDto()
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                Description = x.Description,
                Reviews = x.Reviews.Select(y=> new ReviewProductDto()
                {
                    Id = y.Id,
                    Comment = y.Comment,
                    NameUser = y.NameUser
                }).ToList()

            }).FirstOrDefault();
            if (product == null)
            {
                return BadRequest("Товара нет");
            }
            return Ok(product);
        }

        [HttpGet("All")]
        public IActionResult GetAllProduct()
        {
            var listProducts = FakeDatabase._products.Select(x => new ProductCardDto()
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                CountReview = x.Reviews.Count()
            }).ToList();
            return Ok(listProducts);
        }
    }

    public class ProductCardDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int Price { get; set; }
        public int CountReview { get; set; } = 0;
    }
    public class ProductFullDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int Price { get; set; }
        public string Description { get; set; } = "";
        public List<ReviewProductDto> Reviews = new List<ReviewProductDto>();
    }

    public class ReviewProductDto
    {
        public int Id { get; set; }
        public string NameUser { get; set; } = "";
        public string Comment { get; set; } = "";
    }
}
