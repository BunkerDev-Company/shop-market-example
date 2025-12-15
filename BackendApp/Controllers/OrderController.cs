using CoreData.Contexts;
using CoreData.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ShopMarketContext _context;

        public OrderController(ShopMarketContext context)
        {
            _context = context;
        }

        [HttpPost("SendOrder")]
        public async Task<ActionResult> SendOrder([FromBody] SendOrderDto order)
        {
            try
            {
                if (order.Products.Count <= 0) return BadRequest("Товаров в корзине нет");

                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == order.IdUser);
                if (user == null) return BadRequest("Пользователь не найден");

                var idsProducts = order.Products.Select(x => x.Id);
                var products = await _context.Products.AsNoTracking().Where(x => idsProducts.Contains(x.Id)).ToListAsync();

                var productsAndCount = products.Select(x => new ProductAndCount()
                {
                    Product = x,
                    Count = order.Products.Where(y => y.Id == x.Id).First().Count
                }).ToList();

                var cartOrder = new CartOrder()
                {
                    Id = Guid.NewGuid(),
                    CreateDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified),
                    UpdateDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified),
                    IsActive = true,
                    IsAddScore = true,
                    Price = productsAndCount.Sum(x => x.Product.Price * x.Count),
                    Score = productsAndCount.Sum(x => x.Product.Score * x.Count),
                };

                await _context.CartOrders.AddAsync(cartOrder);

                List<ProductCartOrder> listCartOrder = productsAndCount.Select(x => new ProductCartOrder()
                {
                    Id = Guid.NewGuid(),
                    CreateDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified),
                    UpdateDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified),
                    IsActive = true,
                    CartOrderId = cartOrder.Id,
                    Price = x.Product.Price * x.Count,
                    Score = x.Product.Score * x.Count,
                    IsAddScore = true,
                    ProductId = x.Product.Id,
                    CountProduct = x.Count

                }).ToList();

                await _context.ProductCartOrders.AddRangeAsync(listCartOrder);

                var _order = new Order()
                {
                    Id = Guid.NewGuid(),
                    Address = order.Address,
                    CreateDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified),
                    UpdateDate = DateTime.SpecifyKind(DateTime.UtcNow, DateTimeKind.Unspecified),
                    IsActive = true,
                    CartOrderId = cartOrder.Id,
                    City = order.City,
                    Fio = order.Fio,
                    IsAddScore = true,
                    IsPickup = order.IsPickup,
                    Price = cartOrder.Price,
                    Score = cartOrder.Score,
                    NumberOrder = @$"ЗК-{DateTime.UtcNow.Year}-{DateTime.UtcNow.Month}-{DateTime.UtcNow.Day}-{DateTime.UtcNow.Hour}-{DateTime.UtcNow.Second}",
                    UserId = user.Id,
                };

                await _context.Orders.AddAsync(_order);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
    }

    public class ProductAndCount
    {
        public Product Product { get; set; }
        public int Count { get; set; }  
    }

    public class SendOrderDto
    {
        public Guid IdUser;
        public string Fio { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public bool IsPickup { get; set; }

        public List<SendOrderProductDto> Products { get; set; }
    }

    public class  SendOrderProductDto
    {
        public Guid Id;
        public int Count;
    }
}
