namespace Pharmacy.Domain.models;
public class Order
{
    public Order(int orderId, int userId, int cartId, int pharmacyId, decimal totalPrice, DateTime creationDate, DateTime completionDate, OrderState orderState)
    {
        OrderId = orderId;
        UserId = userId;
        CartId = cartId;
        PharmacyId = pharmacyId;
        TotalPrice = totalPrice;
        CreationDate = creationDate;
        CompletionDate = completionDate;
        OrderState = orderState;
    }

    public Order(int userId, int cartId, int pharmacyId, decimal totalPrice)
    {
        UserId = userId;
        CartId = cartId;
        PharmacyId = pharmacyId;
        TotalPrice = totalPrice;
        CreationDate = DateTime.Now;
        OrderState = OrderState.Created;
    }

    protected Order()
    {
    }

    public int OrderId {get; set;}
    public int UserId {get; set;}
    public int CartId {get; set;}
    public int PharmacyId {get; set;}
    public decimal TotalPrice {get; set;}
    public DateTime CreationDate {get; set;}
    public DateTime CompletionDate {get; set;}
    public OrderState OrderState {get; set;}

    public Cart Cart{get; set;} = null!;
    public Payment? Payment {get; set;}
    public User User {get; set;}
}