namespace Pharmacy.Domain.models;
public class Apteka
{
    public Apteka(int aptekaId, string address, string district, string metro, string worktime)
    {
        AptekaId = aptekaId;
        Address = address;
        District = district;
        Metro = metro;
        WorkTime = worktime;
    }

    protected Apteka()
    {
    }

    public int AptekaId {get; set;}
    public string Address {get; set;}
    public string District {get; set;}
    public string Metro {get; set;}
    public string WorkTime {get; set;}

    public List<Order> Orders{get; set;}
    public List<FavorPharmacy> FavorPharmacies{get; set;}
    public List<PharmacyDrug> PharmacyDrugs{get; set;}
 }