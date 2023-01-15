namespace Pharmacy.Domain.models;
public class Drug{
    public Drug(int id, string image, string title, string description, double price)
    {
        Id = id;
        Image = image;
        Title = title;
        Description = description;
        Price = price;
    }

    protected Drug()
    {
    }

    public int Id {get; set;}
    public string Image {get; set;}
    public string Title {get; set;}
    public string Description {get;set;}
    public double Price {get; set;}
}