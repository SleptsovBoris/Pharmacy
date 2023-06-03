using Microsoft.AspNetCore.Mvc;
using Pharmacy.Domain.data;
using Pharmacy.Domain.models;

namespace Pharmacy.API.Controllers;

[ApiController]
[Route("[controller]")]

public class DrugFormController : ControllerBase
{
    private readonly ILogger<DrugFormController> _logger;
    private readonly PharmacyContext _context;

    public DrugFormController(ILogger<DrugFormController> logger, PharmacyContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<DrugForm> Get()
    {
        return _context.DrugForms.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<string> Get(int id)
    {
        var drugForm = _context.DrugForms.Find(id);
        if (drugForm == null)
        {
            return NotFound("DrugForm not found");
        }
        return drugForm.FormName;
    }
}