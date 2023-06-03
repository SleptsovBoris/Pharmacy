namespace Pharmacy.Domain.models;
public class PharmacyDrug
{
    public PharmacyDrug(int pharmacyDrugId, int aptekaId, int drugId)
    {
        PharmacyDrugId = pharmacyDrugId;
        AptekaId = aptekaId;
        DrugId = drugId;
    }

    public int PharmacyDrugId {get; set;}
    public int AptekaId {get; set;}
    public int DrugId {get; set;}
}