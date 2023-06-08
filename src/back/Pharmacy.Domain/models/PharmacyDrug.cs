namespace Pharmacy.Domain.models;
public class PharmacyDrug
{
    public PharmacyDrug(int pharmacyDrugId, int aptekaId, int drugId, int amount)
    {
        PharmacyDrugId = pharmacyDrugId;
        AptekaId = aptekaId;
        DrugId = drugId;
        Amount = amount;
    }

    public int PharmacyDrugId {get; set;}
    public int AptekaId {get; set;}
    public int DrugId {get; set;}
    public int Amount {get; set;}
}