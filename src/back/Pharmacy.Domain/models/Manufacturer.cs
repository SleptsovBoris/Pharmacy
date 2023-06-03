namespace Pharmacy.Domain.models;

public class Manufacturer{
    public Manufacturer(int id, string manufacturerName){
        ManufacturerId = id;
        ManufacturerName = manufacturerName;
    }

    protected Manufacturer(){}

    public int ManufacturerId {get; set;}
    public string ManufacturerName {get; set;}
}