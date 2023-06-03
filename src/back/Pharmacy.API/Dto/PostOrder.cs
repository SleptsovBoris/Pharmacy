namespace Pharmacy.API.Dto;

public class PostOrder
{
    public PostOrder(int cartId, int pharmacyId)
    {
        CartId = cartId;
        PharmacyId = pharmacyId;
    }

    public int CartId {get; set;}
    public int PharmacyId {get; set;}
}