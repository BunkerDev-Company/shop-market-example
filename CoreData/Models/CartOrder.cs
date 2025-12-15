using System;
using System.Collections.Generic;

namespace CoreData.Models;

public partial class CartOrder
{
    public Guid Id { get; set; }

    public long Price { get; set; }

    public long Score { get; set; }

    public bool IsAddScore { get; set; }

    public DateTime CreateDate { get; set; }

    public DateTime UpdateDate { get; set; }

    public bool IsActive { get; set; }

    public virtual Order? Order { get; set; }

    public virtual ICollection<ProductCartOrder> ProductCartOrders { get; set; } = new List<ProductCartOrder>();
}
