using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.API.Dto;
using Pharmacy.Domain.data;
using Pharmacy.Domain.models;

namespace Pharmacy.API.Controllers;

[ApiController]
[Route("[controller]")]

public class FavorDrugsController: BaseController
{
    private readonly ILogger<FavorPharmaciesController> _logger;
    private readonly PharmacyContext _context;

    public FavorDrugsController(ILogger<FavorPharmaciesController> logger, PharmacyContext context)
    {
        _logger = logger;
        _context = context;
    }    

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        var userId = GetCurrentUserId();

        var favorDrugList = _context.FavorDrugs.Where((favorDrug) => favorDrug.UserId == userId).ToList();

        List<Drug> drugsList = new List<Drug>();

        foreach(var favorDrug in favorDrugList)
        {
            var drug = _context.Drugs.Where((drug) => drug.DrugId == favorDrug.DrugId).ToList();
            drugsList.AddRange(drug);
        }

        if (drugsList.Count == 0)
        {
            return Json(new { data = new List<Drug>() });
        }

        var response = new
        {
            data = drugsList,
        };

        return Json(response);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Post([FromBody] PostFavorDrug favorDrug)
    {
        try
        {
            var userId = GetCurrentUserId();

            var favorDrugModel = new FavorDrug(userId!.Value, favorDrug.DrugId);
            var dbFavorDrugEntity =_context.FavorDrugs.Add(favorDrugModel);
            _context.SaveChanges();

            var response = new
            {
                data = dbFavorDrugEntity.Entity,
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