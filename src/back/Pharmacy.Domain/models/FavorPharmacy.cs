namespace Pharmacy.Domain.models;
public class FavorPharmacy
{
    public FavorPharmacy(int favorPharmacyId, int aptekaId, int userId)
    {
        FavorPharmacyId = favorPharmacyId;
        AptekaId = aptekaId;
        UserId = userId;
    }

    public FavorPharmacy(int aptekaId, int userId)
    {
        AptekaId = aptekaId;
        UserId = userId;
    }

    public int FavorPharmacyId {get; set;}
    public int AptekaId {get; set;}
    public int UserId {get; set;}
}