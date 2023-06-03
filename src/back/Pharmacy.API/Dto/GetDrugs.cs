namespace Pharmacy.API.Dto;

public class GetDrugs
{
    public GetDrugs(){}
    public GetDrugs(int? manufacturer, int? kind, string? name)
    {
        Manufacturer = manufacturer;
        Kind = kind;
        Name = name;
    }

    public int? Manufacturer {get; set;}
    public int? Kind {get; set;}
    public string? Name { get; set; }
}