using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pharmacy.API.Dto;
using Microsoft.EntityFrameworkCore;
using Pharmacy.Domain.data;
using Pharmacy.Domain.models;

namespace Pharmacy.API.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : BaseController
{
    private readonly ILogger<OrdersController> _logger;
    private readonly PharmacyContext _context;

    public OrdersController(ILogger<OrdersController> logger, PharmacyContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("all")]
    [AllowAnonymous]
    public IActionResult GetAllOrders()
    {
        var response = new
        {
            data = _context.Orders
                .Include(p => p.Pharmacy)
                .Include(o => o.Cart)
                .Include(c => c.Cart.CartItems)
                .ThenInclude(x => x.Drug)
        };

        return Json(response);
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        var userId = GetCurrentUserId();

        var response = new
        {
            data = _context.Orders
                .Include(p => p.Pharmacy)
                .Include(o => o.Cart)
                .Include(c => c.Cart.CartItems)
                .ThenInclude(x => x.Drug)
                .Where((order) => order.UserId == userId),
        };

        return Json(response);
    }

    [HttpPost("{pharmacyId}")]
    [Authorize]
    public IActionResult Post(int pharmacyId)
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered);
            var pharmacy = _context.Apteki.FirstOrDefault(pharmacy => pharmacy.AptekaId == pharmacyId);

            if (userId is null)
            {
                return BadRequest(new {errorText = "Пользователь не найден"});
            }

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

            var orderModel = new Order(userId.Value, cart.CartId, pharmacyId, totalPrice);
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
                new {errorText = $"Во время выполнения запроса произошла ошибка {ex.Message}"});
        }
    }

    [HttpPut]
    public IActionResult UpdateOrderState([FromBody] PutOrder putOrder)
    {
        try
        {
            var order = _context.Orders.FirstOrDefault(o => o.OrderId == putOrder.OrderId);

            if (order == null)
            {
                return NotFound(new { errorText = "Заказ не найден" });
            }

            order.OrderState = putOrder.OrderState;
            _context.Orders.Update(order);
            _context.SaveChanges();

            return Ok(new { message = "Статус заказа успешно обновлен" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());

            return StatusCode(StatusCodes.Status500InternalServerError,
                new { errorText = "Во время выполнения запроса произошла ошибка" });
        }
    }
}