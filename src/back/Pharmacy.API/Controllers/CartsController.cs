using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pharmacy.API.Dto;
using Pharmacy.Domain.data;
using Pharmacy.Domain.models;

namespace Pharmacy.API.Controllers;

[ApiController]
[Route("[controller]")]
public class CartsController : BaseController
{
    private readonly ILogger<CartsController> _logger;
    private readonly PharmacyContext _context;

    public CartsController(ILogger<CartsController> logger, PharmacyContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        var userId = GetCurrentUserId();

        var cart = _context.Carts
            .Include(c => c.CartItems)
            .ThenInclude(x => x.Drug)
            .FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered);

        if(cart is null)
        {
            return BadRequest(new {errorText = "Не удалось найти активную корзину для текущего пользователя"});
        }

        var response = new
        {
            data = cart.CartItems,
        };

        return Json(response);
    }

    [HttpPost("/cart-item")]
    [Authorize]
    public IActionResult PostCartItem([FromBody] PostCartItem postCartItem)
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered);

            if (cart is null) 
            {
                cart = new Cart(userId!.Value);

                cart = _context.Carts.Add(cart).Entity;
                _context.SaveChanges();
            }

            var drug = _context.Drugs.Find(postCartItem.DrugId);
            if(drug is null)
            {
                return BadRequest(new {errorText = "Не удалось найти соответствующее лекарство"});
            }
            var newCartItem = new CartItem(postCartItem.DrugId, postCartItem.Amount, drug.Price);
            var dbCartItem = _context.CartItems.Add(newCartItem).Entity;

            drug.Count = drug.Count - postCartItem.Amount;

            if(cart.CartItems == null)
            {
                cart.CartItems = new List<CartItem>();
            }
            cart.CartItems.Add(dbCartItem);
            _context.Update(cart);
            _context.SaveChanges();

            var response = new
            {
                data = cart.CartItems,
            };

            return Json (response);
        }
        catch(Exception ex){
            _logger.LogError(ex.ToString());

            return StatusCode(StatusCodes.Status500InternalServerError, 
                new {errorText = "Во время выполнения запроса произошла ошибка"});
        }
    }

    [HttpDelete("/cart-item/{cartItemId}")]
    [Authorize]
    public IActionResult DeleteCartItem(int cartItemId)
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered);
            if (cart is null) 
            {
                return BadRequest(new { errorText = "Не удалось найти активную корзину для текущего пользователя" });
            }

            var cartItem = cart.CartItems.Find((item) => item.DrugId == cartItemId);
            if (cartItem is null)
            {
                return BadRequest(new { errorText = "Не удалось найти указанный элемент корзины" });
            }
            
            var drug = _context.Drugs.Find(cartItemId);

            if(drug != null) drug.Count = drug.Count + cartItem.Amount;

            cart.CartItems.Remove(cartItem);
            _context.SaveChanges();

            var response = new
            {
                data = cart.CartItems,
            };

            return Json(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());

            return StatusCode(StatusCodes.Status500InternalServerError,
                new { errorText = "Во время выполнения запроса произошла ошибка" });
        }
    }

    [HttpPatch("/cart-item")]
    [Authorize]
    public IActionResult ChangeCartItemAmount(PutCartItem putCartItem)
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered);
            if (cart is null)
            {
                return BadRequest(new { errorText = "Не удалось найти активную корзину для текущего пользователя" });
            }

            var cartItem = cart.CartItems.Find((item) => item.DrugId == putCartItem.DrugId);
            if (cartItem is null)
            {
                return BadRequest(new { errorText = "Не удалось найти указанный элемент корзины" });
            }

            if (putCartItem.Count <= 0)
            {
                return BadRequest(new { errorText = "Вы передали нулевое количество"});
            }
            else
            {
                int countDifference = cartItem.Amount - putCartItem.Count;
                cartItem.Amount = putCartItem.Count;
                var drug = _context.Drugs.Find(putCartItem.DrugId);
                if(drug != null) drug.Count = drug.Count + countDifference;
            }

            _context.SaveChanges();

            var response = new
            {
                data = cart.CartItems,
            };

            return Json(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.ToString());

            return StatusCode(StatusCodes.Status500InternalServerError,
                new { errorText = "Во время выполнения запроса произошла ошибка" });
        }
    }
}