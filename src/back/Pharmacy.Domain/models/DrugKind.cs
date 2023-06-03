namespace Pharmacy.Domain.models;

public class DrugKind{
    public DrugKind(int kindid, string kindName){
        KindId = kindid;
        KindName = kindName;
    }

    protected DrugKind(){}

    public int KindId {get; set;}
    public string KindName {get; set;}
}