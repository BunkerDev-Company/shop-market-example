using System;
using System.Collections.Generic;

namespace CoreData.Models;

public partial class ProductCartOrder
{
    public Guid Id { get; set; }

    public long Price { get; set; }

    public long Score { get; set; }

    public bool IsAddScore { get; set; }

    public DateTime CreateDate { get; set; }

    public DateTime UpdateDate { get; set; }

    public bool IsActive { get; set; }

    public Guid? ProductId { get; set; }

    public Guid? CartOrderId { get; set; }

    public long CountProduct { get; set; }

    public virtual CartOrder? CartOrder { get; set; }

    public virtual Product? Product { get; set; }
}
