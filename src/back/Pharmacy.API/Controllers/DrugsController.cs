using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pharmacy.API.Dto;
using Pharmacy.Domain.data;
using Pharmacy.Domain.models;

namespace Pharmacy.API.Controllers;

[ApiController]
[Route("[controller]")]
public class DrugsController : ControllerBase
{
    private readonly ILogger<DrugsController> _logger;
    private readonly PharmacyContext _context;

    public DrugsController(ILogger<DrugsController> logger, PharmacyContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Drug> Get([FromQuery] GetDrugs getDrugs)
    {
        return _context.Drugs.Where(drug => (getDrugs.Manufacturer == null || drug.ManufacturerId == getDrugs.Manufacturer) &&
                                            (getDrugs.Kind == null || drug.KindId == getDrugs.Kind) &&
                                            (getDrugs.Name == null || drug.DrugName == getDrugs.Name)).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Drug> Get(int id)
    {
        var drug = _context.Drugs.Find(id);
        if(drug == null)
        {
            return NotFound("Drug not found");
        }
        return drug;
    }

    [HttpPost]
    public int Post([FromBody] PostDrug drug)
    {
        try{
            var dbDrugEntity =_context.Drugs.Add(drug.ToDomainDrug());
            _context.SaveChanges();

            return dbDrugEntity.Entity.DrugId;
        }
        catch(Exception ex){
            _logger.LogError(ex.ToString());

            return -1;
        }
    }

    [HttpPut]
    public bool Put([FromBody] PutDrug drug)
    {
        try
        {
            var dbDrug = _context.Drugs.Find(drug.DrugId);
            
            if(dbDrug is null) return false;

            drug.UpdateDomainDrug(dbDrug);
            _context.Drugs.Update(dbDrug);
            _context.SaveChanges();

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());
            return false;
        }
    }
}