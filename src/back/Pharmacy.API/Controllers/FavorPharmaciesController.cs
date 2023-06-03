using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.API.Dto;
using Pharmacy.Domain.data;
using Pharmacy.Domain.models;

namespace Pharmacy.API.Controllers;

[ApiController]
[Route("[controller]")]

public class FavorPharmaciesController: BaseController
{
    private readonly ILogger<FavorPharmaciesController> _logger;
    private readonly PharmacyContext _context;

    public FavorPharmaciesController(ILogger<FavorPharmaciesController> logger, PharmacyContext context)
    {
        _logger = logger;
        _context = context;
    }    

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        var userId = GetCurrentUserId();

        var favorPharmacyList = _context.FavorPharmacies.Where(favorPharmacy => favorPharmacy.UserId == userId).ToList();

        List<Apteka> pharmaciesList = new List<Apteka>();

        foreach (var favorPharmacy in favorPharmacyList)
        {
            var apteka = _context.Apteki.Where(apteka => apteka.AptekaId == favorPharmacy.AptekaId).ToList();
            pharmaciesList.AddRange(apteka);
        }

        if (pharmaciesList.Count == 0)
        {
            return Json(new { data = new List<Apteka>() });
        }

        var response = new
        {
            data = pharmaciesList,
        };

        return Json(response);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Post([FromBody] PostFavorPharmacy favorPharmacy)
    {
        try
        {
            var userId = GetCurrentUserId();

            var favorPharmacyModel = new FavorPharmacy(favorPharmacy.AptekaId, userId!.Value);
            var dbFavorPharmacyEntity =_context.FavorPharmacies.Add(favorPharmacyModel);
            _context.SaveChanges();

            var response = new
            {
                data = dbFavorPharmacyEntity.Entity,
            };

            return Json (response);
        }
        catch(Exception ex){
            _logger.LogError(ex.ToString());

            return StatusCode(StatusCodes.Status500InternalServerError, 
                new {errorText = "Во время выполнения запроса произошла ошибка"});
        }
    }
 }