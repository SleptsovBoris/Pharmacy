using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.API.Dto;
using Pharmacy.Domain.data;
using Pharmacy.Domain.models;

namespace Pharmacy.API.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : BaseController
{
    private readonly ILogger<DrugsController> _logger;
    private readonly PharmacyContext _context;

    public OrdersController(ILogger<DrugsController> logger, PharmacyContext context)
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
            data = _context.Orders.Where((order) => order.UserId == userId),
        };

        return Json(response);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Post([FromBody] PostOrder order)
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts.Find(order.CartId);
            var pharmacy = _context.Apteki.Find(order.PharmacyId);

            if (cart is null) 
            {
                return BadRequest(new {errorText = "Корзина пуста"});
            }

            if (pharmacy is null) 
            {
                return BadRequest(new {errorText = "Аптеки нет"});
            }

            decimal totalPrice = 0;
            foreach (var cartItem in cart.CartItems)
            {
                totalPrice += cartItem.PricePerOne * cartItem.Amount;
            }

            var orderModel = new Order(userId!.Value, order.CartId, order.PharmacyId, totalPrice);
            var dbOrderEntity =_context.Orders.Add(orderModel);

            cart.IsOrdered = true;

            _context.Update(cart);
            _context.SaveChanges();

            var response = new
            {
                data = dbOrderEntity.Entity.OrderId,
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