using Pharmacy.Domain.models;

namespace Pharmacy.API.Dto;
public class PutDrug{
    public PutDrug(int drugId, string drugName, string description, string amount, string instruction, int price, int count)
    {
        DrugId = drugId;
        DrugName = drugName;
        Description = description;
        Amount = amount;
        Instruction = instruction;
        Price = price;
        Count = count;
    }

    public int DrugId {get; set;}
    public string DrugName {get; set;}
    public string Description {get;set;}
    public string Amount {get; set;}
    public string Instruction {get; set;}
    public int Price {get; set;}
    public int Count {get; set;}

    public void UpdateDomainDrug(Drug drug)
    {
        drug.DrugName = DrugName;
        drug.Description = Description;
        drug.Amount = Amount;
        drug.Instruction = Instruction;
        drug.Price = Price;
        drug.Count = Count;
    }
}