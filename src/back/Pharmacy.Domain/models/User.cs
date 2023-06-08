using System.Text.Json.Serialization;

namespace Pharmacy.Domain.models;
public class User
{
    public User(
        int id, 
        bool isAnonymous, 
        DateTime creationDate, 
        string phone, 
        string normalizedPhone, 
        string passwordHash)
    {
        UserId = id;
        IsAnonymous = isAnonymous;
        CreationDate = creationDate;
        Phone = phone;
        NormalizedPhone = normalizedPhone;
        PasswordHash = passwordHash;
    }

    public User(string phone)
    {
        CreationDate = DateTime.Now;
        IsAnonymous = false;
        Phone = phone;
        NormalizedPhone = getNormalizedPhone(phone);
    }

    public string getNormalizedPhone(string phone)
    {
        phone = phone.Insert(0, "(");
        phone = phone.Insert(4, ") ");
        phone = phone.Insert(9, " ");
        phone = phone.Insert(12, "-");
        string normalizedPhone = "+7 " + phone;
        return normalizedPhone;
    }

    public static User AnonymousUser()
    {
        var user = new User();
        
        user.CreationDate = DateTime.Now;
        user.IsAnonymous = true;
        user.Phone = string.Empty;
        user.NormalizedPhone = string.Empty;
        user.PasswordHash = string.Empty;

        return user;
    }

    protected User()
    {
    }

    public int UserId {get; set;}
    public bool IsAnonymous {get; set;}

    [JsonIgnore]
    public DateTime CreationDate {get; set;}
    public string Phone {get; set;} //+7 (999) 999 99-99

    [JsonIgnore]
    public string NormalizedPhone {get; set;} //9999999999 ( +7/8)

    [JsonIgnore]
    public string PasswordHash {get; set;}
}