namespace Pharmacy.Domain.models;
public class FavorDrug
{
    public FavorDrug(int favorDrugId, int userId, int drugId)
    {
        FavorDrugId = favorDrugId;
        UserId = userId;
        DrugId = drugId;
    }

    public FavorDrug(int userId, int drugId)
    {
        UserId = userId;
        DrugId = drugId;
    }

    public int FavorDrugId {get; set;}
    public int UserId {get; set;}
    public int DrugId {get; set;}
}