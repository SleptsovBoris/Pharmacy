namespace Pharmacy.API.Dto;

public class PostFavorDrug
{
    public PostFavorDrug(int userId, int drugId)
    {
        UserId = userId;
        DrugId = drugId;
    }

    public int UserId {get; set;}
    public int DrugId {get; set;}
}