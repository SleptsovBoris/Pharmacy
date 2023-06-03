using Microsoft.AspNetCore.Mvc;
using Pharmacy.API.Dto;
using Pharmacy.Domain.data;
using Pharmacy.Domain.models;

namespace Pharmacy.API.Controllers;

[ApiController]
[Route("[controller]")]
public class PharmaciesController: ControllerBase
{
    private readonly ILogger<PharmaciesController> _logger;
    private readonly PharmacyContext _context;

    public PharmaciesController(ILogger<PharmaciesController> logger, PharmacyContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Apteka> Get([FromQuery] GetPharmacies getPharmacies)
    {
        return _context.Apteki.Where(pharmacy => (getPharmacies.WorkTime == null || pharmacy.WorkTime == getPharmacies.WorkTime) &&
                                                 (getPharmacies.District == null || pharmacy.District == getPharmacies.District) &&
                                                 (getPharmacies.Metro == null || pharmacy.Metro == getPharmacies.Metro) &&
                                                 (getPharmacies.Address == null || pharmacy.Address == getPharmacies.Address)).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Apteka> Get(int id)
    {
        var apteka = _context.Apteki.Find(id);
        if(apteka == null)
        {
            return NotFound("Apteka not found");
        }
        return apteka;
    }
}