using Company_Project.Models;
using Company_Project.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Company_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _service;
        public TokenController(ApplicationDbContext context, ITokenService service)
        {
            _context =  context;
            _service = service;
        }
        [HttpPost]
        [Route("Refresh")]
        public IActionResult Refresh(RefreshTokenRequest tokenApiModel)
        {
            if (tokenApiModel is null)
                return BadRequest("Invalid client request");
            string accessToken = tokenApiModel.AccessToken;
            string refreshToken = tokenApiModel.RefreshToken;
            var principal = _service.GetPrincipleFromExpiredToken(accessToken);
            var username = principal.Identity.Name;
            var user = _context.TokenInfo.SingleOrDefault(u => u.Username == username);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiry <= DateTime.Now)
                return BadRequest("Invalid client Request");
            var newAccessToken = _service.GetToken(principal.Claims);
            var newRefreshToken = _service.GetRefreshToken();
            user.RefreshToken = newRefreshToken;
            _context.SaveChanges();
            return Ok(new RefreshTokenRequest()
            {
                AccessToken = newAccessToken.TokenString,
                RefreshToken = newRefreshToken
            });
        }
        [HttpPost, Authorize]
        [Route("Revoke")]

        public IActionResult Revoke()
        {
            try
            {
                var username = User.Identity.Name;
                var user = _context.TokenInfo.SingleOrDefault(u => u.Username == username);
                if (user is null)
                    return BadRequest();
                user.RefreshToken = null;
                _context.SaveChanges();
                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
