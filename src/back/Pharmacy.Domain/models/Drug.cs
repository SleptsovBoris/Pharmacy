namespace Pharmacy.Domain.models;
public class Drug{
    public Drug(
        int id, 
        string drugname, 
        string image, string 
        description, int kindId, 
        int formId, 
        int manufacturerId, 
        string amount, 
        string instruction, 
        int price, 
        string recept)
    {
        DrugId = id;
        DrugName = drugname;
        Img = image;
        Description = description;
        KindId = kindId;
        FormId = formId;
        ManufacturerId = manufacturerId;
        Amount = amount;
        Instruction = instruction;
        Price = price;
        Recept = recept;
    }

    public Drug(
        string drugname, 
        string image, 
        string description, 
        int kindId, 
        int formId, 
        int manufacturerId, 
        string amount, 
        string instruction, 
        int price, 
        string recept,
        int count)
    {
        DrugName = drugname;
        Img = image;
        Description = description;
        KindId = kindId;
        FormId = formId;
        ManufacturerId = manufacturerId;
        Amount = amount;
        Instruction = instruction;
        Price = price;
        Recept = recept;
        Count = count;
    }

    protected Drug()
    {
    }

    public int DrugId {get; set;}
    public string DrugName {get; set;}
    public string Img {get; set;}
    public string Description {get;set;}
    public int KindId {get; set;}
    public int FormId {get; set;}
    public int ManufacturerId {get; set;}
    public string Amount {get; set;}
    public string Instruction {get; set;}
    public int Price {get; set;}
    public string Recept {get; set;}
    public int Count {get; set;}
}