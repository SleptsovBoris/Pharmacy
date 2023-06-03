using Pharmacy.Domain.models;

namespace Pharmacy.API.Dto;

public class PostFavorPharmacy
{
    public PostFavorPharmacy(int userId, int pharmacyId)
    {
        UserId = userId;
        AptekaId = pharmacyId;
    }

    public int UserId {get; set;}
    public int AptekaId {get; set;}
}