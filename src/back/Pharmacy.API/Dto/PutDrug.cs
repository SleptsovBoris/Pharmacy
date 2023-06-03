using Pharmacy.Domain.models;

namespace Pharmacy.API.Dto;
public class PutDrug{
    public PutDrug(int id, string drugname, string image, string description, int kind, int form, int manufacturer, string amount, string instruction, int price, string recept)
    {
        DrugId = id;
        DrugName = drugname;
        Img = image;
        Description = description;
        Kind = kind;
        Form = form;
        Manufacturer = manufacturer;
        Amount = amount;
        Instruction = instruction;
        Price = price;
        Recept = recept;
    }

    public int DrugId {get; set;}
    public string DrugName {get; set;}
    public string Img {get; set;}
    public string Description {get;set;}
    public int Kind {get; set;}
    public int Form {get; set;}
    public int Manufacturer {get; set;}
    public string Amount {get; set;}
    public string Instruction {get; set;}
    public int Price {get; set;}
    public string Recept {get; set;}

    public void UpdateDomainDrug(Drug drug)
    {
        drug.DrugName = DrugName;
        drug.Img = Img;
        drug.Description = Description;
        drug.KindId = Kind;
        drug.FormId = Form;
        drug.ManufacturerId = Manufacturer;
        drug.Amount = Amount;
        drug.Instruction = Instruction;
        drug.Price = Price;
        drug.Recept = Recept;
    }
}