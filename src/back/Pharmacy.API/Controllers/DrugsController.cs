using Microsoft.AspNetCore.Mvc;
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
    public IEnumerable<Drug> Get()
    {
        return _context.Drugs.ToList();
    }
}