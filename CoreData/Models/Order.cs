using System;
using System.Collections.Generic;

namespace CoreData.Models;

public partial class Order
{
    public Guid Id { get; set; }

    public string? Fio { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public bool IsPickup { get; set; }

    public string? NumberOrder { get; set; }

    public long Price { get; set; }

    public long Score { get; set; }

    public bool IsAddScore { get; set; }

    public DateTime CreateDate { get; set; }

    public DateTime UpdateDate { get; set; }

    public bool IsActive { get; set; }

    public Guid? UserId { get; set; }

    public Guid? CartOrderId { get; set; }

    public virtual CartOrder? CartOrder { get; set; }

    public virtual User? User { get; set; }
}
