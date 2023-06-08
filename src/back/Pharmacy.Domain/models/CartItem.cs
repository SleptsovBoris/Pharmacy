namespace Pharmacy.Domain.models;
public class CartItem
{
    public CartItem(int cartItemId, Drug drug, int drugId, int amount, decimal priceperone)
    {
        CartItemId = cartItemId;
        Drug = drug;
        DrugId = drugId;
        Amount = amount;
        PricePerOne = priceperone;
    }

    public CartItem(int drugId, int amount, decimal priceperone)
    {
        DrugId = drugId;
        Amount = amount;
        PricePerOne = priceperone;
    }

    protected CartItem()
    {
    }

    public int CartItemId {get; set;}
    public Drug Drug {get; set;}
    public int DrugId {get; set;}
    public int Amount {get; set;}
    public decimal PricePerOne {get; set;}
}