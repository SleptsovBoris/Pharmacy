using Pharmacy.Domain.models;

namespace Pharmacy.API.Dto;

public class PutOrder
{  
    public PutOrder(int orderId, int orderState)
    {
        OrderId = orderId;
        OrderState = orderState;
    }

    public int OrderId {get; set;}
    public int OrderState {get; set;}
}