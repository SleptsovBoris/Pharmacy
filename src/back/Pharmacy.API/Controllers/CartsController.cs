using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        var response = new
        {
            data = _context.Carts.FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered),
        };

        return Json(response);
    }

    [HttpPost]
    [Authorize]
    public IActionResult Post()
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts.FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered);
            if (cart is null) 
            {
                cart = new Cart(userId!.Value);

                cart = _context.Add(cart).Entity;
                _context.SaveChanges();
            }

            var response = new
            {
                data = cart,
            };

            return Json (response);
        }
        catch(Exception ex){
            _logger.LogError(ex.ToString());

            return StatusCode(StatusCodes.Status500InternalServerError, 
                new {errorText = "Во время выполнения запроса произошла ошибка"});
        }
    }

    [HttpPost("[controller]/cart-item")]
    [Authorize]
    public IActionResult PostCartItem([FromBody] PostCartItem postCartItem)
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts.FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered);
            if (cart is null) 
            {
                return BadRequest(new {errorText = "Не удалось найти активную корзину для текущего пользователя"});
            }

            var isCartItemAlreadyInCurrentCart =
                cart.CartItems.Any((cartItem) => cartItem.Drug == postCartItem.DrugId);
            if(isCartItemAlreadyInCurrentCart)
            {
                var cartItem = cart.CartItems.First((cartItem) => cartItem.Drug == postCartItem.DrugId);

                if (postCartItem.Amount == 0)
                {
                    cart.CartItems.Remove(cartItem);
                }
                else
                {
                    cartItem.Amount = postCartItem.Amount;
                }
            }
            else
            {
                var drug = _context.Drugs.Find(postCartItem.DrugId);
                if(drug is null)
                {
                    return BadRequest(new {errorText = "Не удалось найти соответствующее лекарство"});
                }
                var newCartItem = new CartItem(postCartItem.DrugId, postCartItem.Amount, drug.Price);

                var dbCartItem = _context.CartItems.Add(newCartItem).Entity;
                cart.CartItems.Add(dbCartItem);
            }

            _context.Update(cart);
            _context.SaveChanges();

            var response = new
            {
                data = cart,
            };

            return Json (response);
        }
        catch(Exception ex){
            _logger.LogError(ex.ToString());

            return StatusCode(StatusCodes.Status500InternalServerError, 
                new {errorText = "Во время выполнения запроса произошла ошибка"});
        }
    }

    [HttpDelete("[controller]/cart-item/{cartItemId}")]
    [Authorize]
    public IActionResult DeleteCartItem(int cartItemId)
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts.FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered);
            if (cart is null) 
            {
                return BadRequest(new { errorText = "Не удалось найти активную корзину для текущего пользователя" });
            }

            var cartItem = cart.CartItems.FirstOrDefault((item) => item.Drug == cartItemId);
            if (cartItem is null)
            {
                return BadRequest(new { errorText = "Не удалось найти указанный элемент корзины" });
            }

            cart.CartItems.Remove(cartItem);
            _context.SaveChanges();

            var response = new
            {
                data = cart,
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

    [HttpPatch("[controller]/cart-item/{cartItemId}/change-amount")]
    [Authorize]
    public IActionResult ChangeCartItemAmount(int cartItemId, int newAmount)
    {
        try
        {
            var userId = GetCurrentUserId();
            var cart = _context.Carts.FirstOrDefault((cart) => cart.UserId == userId && !cart.IsOrdered);
            if (cart is null)
            {
                return BadRequest(new { errorText = "Не удалось найти активную корзину для текущего пользователя" });
            }

            var cartItem = cart.CartItems.FirstOrDefault((item) => item.Drug == cartItemId);
            if (cartItem is null)
            {
                return BadRequest(new { errorText = "Не удалось найти указанный элемент корзины" });
            }

            if (newAmount <= 0)
            {
                cart.CartItems.Remove(cartItem);
            }
            else
            {
                cartItem.Amount = newAmount;
            }

            _context.SaveChanges();

            var response = new
            {
                data = cart,
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