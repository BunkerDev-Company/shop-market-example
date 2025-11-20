using System.Xml.Linq;

namespace ShopBackend.Helpers
{
    public static class FakeDatabase
    {
        public static List<Product> _products = new List<Product>()
        {
            new Product()
            {
                Id = 1,
                Name = "Кепка BunkerDev 2",
                Price = 900,
                Description = "Крутая кепка",
                Reviews = new List<ReviewProduct>()
                {
                    new ReviewProduct()
                    {
                        Id = 1,
                        NameUser = "Максим",
                        Comment = "Купил, не подошла"
                    },
                    new ReviewProduct()
                    {
                        Id = 2,
                        NameUser = "Иван",
                        Comment = "Купил, подошла"
                    },
                }
            },
            new Product()
            {
                Id = 2,
                Name = "Худи Limited",
                Price = 1700,
                Description = "Отличное худи",
                Reviews = new List<ReviewProduct>()
                {
                    new ReviewProduct()
                    {
                        Id = 3,
                        NameUser = "Борис",
                        Comment = "Теплое худи, подошло"
                    },
                }
            },
            new Product()
            {
                Id = 3,
                Name = "Кроссовки Limited",
                Price = 10000,
                Description = "Топовые кроссовки",
                Reviews = new List<ReviewProduct>()
                {
                    new ReviewProduct()
                    {
                        Id = 5,
                        NameUser = "Игорь",
                        Comment = "Эти кроссовки просто имба"
                    },
                    new ReviewProduct()
                    {
                        Id = 6,
                        NameUser = "Виктор",
                        Comment = "Купил, не пожалел"
                    },
                }
            },
            new Product()
            {
                Id = 4,
                Name = "Штаны Limited",
                Price = 3000,
                Description = "Классные штаны!"
            }
        };
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int Price { get; set; }
        public string Description { get; set; } = "";
        public List<ReviewProduct> Reviews = new List<ReviewProduct>();
    }

    public class ReviewProduct
    {
        public int Id { get; set; }
        public string NameUser { get; set; } = "";
        public string Comment { get; set; } = "";
    }
}
