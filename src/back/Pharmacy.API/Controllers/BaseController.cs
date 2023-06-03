using Microsoft.AspNetCore.Mvc;

public abstract class BaseController : Controller
{        
    protected int? GetCurrentUserId()
    {
        return GetUserIdFromClaims(this.User.Claims);
    }

    protected int? GetUserIdFromClaims(IEnumerable<System.Security.Claims.Claim> claims)
    {
        var userIdClaim = claims.FirstOrDefault(claim => claim.Type == "id");

        return userIdClaim is null ? null : int.Parse(userIdClaim.Value); 
    }
}