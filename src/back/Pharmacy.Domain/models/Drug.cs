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
        string recept)
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

    public Manufacturer? Manufacturer {get; set;}
    public DrugKind? Kind {get; set;}
    public DrugForm? Form {get; set;}

    public List<CartItem> CartItems{get; set;}
    public List<FavorDrug> FavorDrugs{get; set;}
    public List<PharmacyDrug> PharmacyDrugs{get; set;}
}