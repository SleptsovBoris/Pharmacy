namespace Pharmacy.API.Dto;

public class GetPharmacies
{
    public GetPharmacies(){}
    public GetPharmacies(string? workTime, string? district, string? metro, string? address)
    {
        WorkTime = workTime;
        District = district;
        Metro = metro;
        Address = address;
    }

    public string? WorkTime {get; set;}
    public string? District {get; set;}
    public string? Metro { get; set; }
    public string? Address {get; set;}
}