using Pharmacy.Domain.models;

namespace Pharmacy.API.Dto;
public class PutCartItem{
    public PutCartItem(int drugId, int count)
    {
        DrugId = drugId;
        Count = count;
    }

    public int DrugId {get; set;}
    public int Count {get; set;}
}