using Pharmacy.Domain.models;

namespace Pharmacy.API.Dto;

public class PostDrug
{
    public PostDrug(string drugname, string img, string description, int kind, int form, int manufacturer, string amount, string instruction, int price, string recept)
    {
        DrugName = drugname;
        Img = img;
        Description = description;
        Kind = kind;
        Form = form;
        Manufacturer = manufacturer;
        Amount = amount;
        Instruction = instruction;
        Price = price;
        Recept = recept;
    }

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

    public Drug ToDomainDrug() => new Drug(
        this.DrugName,
        this.Img, 
        this.Description, 
        this.Kind,
        this.Form,
        this.Manufacturer,
        this.Amount,
        this.Instruction,
        this.Price,
        this.Recept
    );
}