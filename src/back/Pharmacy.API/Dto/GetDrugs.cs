namespace Pharmacy.API.Dto;

public class GetDrugs
{
    public GetDrugs(){}
    public GetDrugs(int? manufacturer, int? kind, string? name, int? form)
    {
        Manufacturer = manufacturer;
        Kind = kind;
        Name = name;
        Form = form;
    }
    public int? Manufacturer {get; set;}
    public int? Kind {get; set;}
    public string? Name { get; set; }
    public int? Form { get; set; }
}