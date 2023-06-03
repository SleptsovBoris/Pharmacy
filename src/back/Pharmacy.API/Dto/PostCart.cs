using System.Collections.ObjectModel;

namespace Pharmacy.API.Dto;

public class PostCart
{
    public PostCart(Collection<PostCartItem> cartItems)
    {
        CartItems = cartItems;
    }

    public Collection<PostCartItem> CartItems {get; set;}
}