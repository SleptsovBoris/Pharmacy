namespace Pharmacy.Domain.models;
public class CartItem
{
    public CartItem(int cartItemId, int drug, int amount, decimal priceperone)
    {
        CartItemId = cartItemId;
        Drug = drug;
        Amount = amount;
        PricePerOne = priceperone;
    }

    public CartItem(int drug, int amount, decimal priceperone)
    {
        Drug = drug;
        Amount = amount;
        PricePerOne = priceperone;
    }

    protected CartItem()
    {
    }

    public int CartItemId {get; set;}
    public int Drug {get; set;}
    public int Amount {get; set;}
    public decimal PricePerOne {get; set;}
}