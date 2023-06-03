using Pharmacy.Domain.models;

namespace Pharmacy.API.Dto;
public class PutUser{
    public PutUser(string phone, string password)
    {
        Phone = phone;
        Password = password;
    }

    public string Phone {get; set;}
    public string Password {get; set;}

    public void UpdateDomainUser(User user, string passwordHash)
    {
        user.Phone = Phone;
        user.PasswordHash = passwordHash;
    }
}