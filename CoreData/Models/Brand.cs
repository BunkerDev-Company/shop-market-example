using System;
using System.Collections.Generic;

namespace CoreData.Models;

public partial class Brand
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Image { get; set; }

    public DateTime CreateDate { get; set; }

    public DateTime UpdateDate { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
