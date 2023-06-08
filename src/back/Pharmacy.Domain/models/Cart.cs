namespace Pharmacy.Domain.models;
public class Cart
{
    public Cart(int cartId, int userId, List<CartItem> cartItems, bool isOrdered)
    {
        CartId = cartId;
        UserId = userId;
        CartItems = cartItems;
        IsOrdered = isOrdered;
    }

    public Cart(int userId)
    {
        UserId = userId;
        IsOrdered = false;
    }

    protected Cart()
    {
    }

    public int CartId {get; set;}
    public int UserId {get; set;}
    public bool IsOrdered {get; set;}
    public List<CartItem> CartItems {get; set;}
}