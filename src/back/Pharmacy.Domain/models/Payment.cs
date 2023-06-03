namespace Pharmacy.Domain.models;
public class Payment
{
    public Payment(int paymentId, int orderId, int userId, DateTime paymentDate, decimal paymentSum)
    {
        PaymentId = paymentId;
        OrderId = orderId;
        UserId = userId;
        PaymentDate = paymentDate;
        PaymentSum = paymentSum;
    }

    public Payment(int orderId, int userId, DateTime paymentDate, decimal paymentSum)
    {
        OrderId = orderId;
        UserId = userId;
        PaymentDate = paymentDate;
        PaymentSum = paymentSum;
    }

    protected Payment()
    {
    }

    public int PaymentId {get; set;}
    public int OrderId {get; set;}
    public int UserId {get; set;}
    public DateTime PaymentDate {get; set;}
    public decimal PaymentSum {get; set;}

    public User User{get; set;}
}