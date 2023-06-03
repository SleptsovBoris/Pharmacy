using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.API.Dto;
using Pharmacy.Domain.data;
using Pharmacy.Domain.models;

namespace Pharmacy.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : BaseController
{
    private readonly ILogger<AccountController> _logger;
    private readonly PharmacyContext _context;

    public AccountController(ILogger<AccountController> logger, PharmacyContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        var userId = GetCurrentUserId();

        var response = new
        {
            data = _context.Users.FirstOrDefault((user) => user.UserId == userId),
        };

        return Json(response);
    }

    [HttpPut]
    [Authorize]
    public IActionResult Put([FromBody] PutUser putUser)
    {
        try
        {
            var userId = GetCurrentUserId();
            var user = _context.Users.FirstOrDefault((user) => user.UserId == userId);

            var passwordHasher = new PasswordHasher<User>();
            var passwordHash = passwordHasher.HashPassword(user, putUser.Password);

            putUser.UpdateDomainUser(user, passwordHash);
            _context.Update(user);
            _context.SaveChanges();

            var response = new
            {
                data = user,
            };

            return Json (response);
        }
        catch(Exception ex)
        {
            _logger.LogError(ex.ToString());

            return StatusCode(StatusCodes.Status500InternalServerError, 
                new {errorText = "Во время выполнения запроса произошла ошибка"});
        }
    }
}