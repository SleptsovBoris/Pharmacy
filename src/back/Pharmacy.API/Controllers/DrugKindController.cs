using Microsoft.AspNetCore.Mvc;
using Pharmacy.Domain.data;
using Pharmacy.Domain.models;

namespace Pharmacy.API.Controllers;

[ApiController]
[Route("[controller]")]

public class DrugKindController : ControllerBase
{
    private readonly ILogger<DrugKindController> _logger;
    private readonly PharmacyContext _context;

    public DrugKindController(ILogger<DrugKindController> logger, PharmacyContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<DrugKind> Get()
    {
        return _context.DrugKinds.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<string> Get(int id)
    {
        var drugKind = _context.DrugKinds.Find(id);
        if(drugKind == null)
        {
            return NotFound("DrugKind not found");
        }
        return drugKind.KindName;
    }

}