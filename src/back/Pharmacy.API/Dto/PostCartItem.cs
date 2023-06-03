using System.Collections.ObjectModel;

namespace Pharmacy.API.Dto;

public class PostCartItem
{
    public PostCartItem(int drugId, int amount)
    {
        DrugId = drugId;
        Amount = amount;
    }

    public int DrugId {get; set;}
    public int Amount {get; set;}
}