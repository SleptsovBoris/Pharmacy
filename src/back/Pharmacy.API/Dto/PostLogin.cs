namespace Pharmacy.API.Dto;

public class PostLogin
{
    public PostLogin(string phone, string password)
    {
        Phone = phone;
        Password = password;
    }

    public string Phone {get; set;}
    public string Password {get; set;}
}