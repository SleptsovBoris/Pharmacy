namespace Pharmacy.API.Dto;

public class PostSignUp
{
    public PostSignUp(string phone, string password)
    {
        Phone = phone;
        Password = password;
    }

    public string Phone {get; set;}
    public string Password {get; set;}
}