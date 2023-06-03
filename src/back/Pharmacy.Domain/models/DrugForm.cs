namespace Pharmacy.Domain.models;

public class DrugForm{
    public DrugForm(int formid, string formName){
        FormId = formid;
        FormName = formName;
    }

    protected DrugForm(){}

    public int FormId {get; set;}
    public string FormName {get; set;}
}