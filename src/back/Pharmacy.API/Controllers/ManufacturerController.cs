using Microsoft.AspNetCore.Mvc;
using Pharmacy.Domain.data;
using Pharmacy.Domain.models;

namespace Pharmacy.API.Controllers;

[ApiController]
[Route("[controller]")]

public class ManufacturerController : ControllerBase
{
    private readonly ILogger<ManufacturerController> _logger;
    private readonly PharmacyContext _context;

    public ManufacturerController(ILogger<ManufacturerController> logger, PharmacyContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Manufacturer> Get()
    {
        return _context.Manufacturers.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<string> Get(int id)
    {
        var manufacturer = _context.Manufacturers.Find(id);
        if(manufacturer == null)
        {
            return NotFound("Manufacturer not found");
        }
        return manufacturer.ManufacturerName;
    }
}