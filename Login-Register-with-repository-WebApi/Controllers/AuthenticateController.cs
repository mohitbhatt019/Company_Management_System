using Company_Project.Models;
using Company_Project.Repository.IRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Company_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IAuthenticateRepository _authenticateRepository;
        private readonly ITokenService _tokenService;
        private readonly ApplicationDbContext _context;



        public AuthenticateController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            IAuthenticateRepository authenticateRepository, ITokenService tokenService, ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _authenticateRepository = authenticateRepository;
            _tokenService = tokenService;
            _context = context;
        }
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var userExists = await _authenticateRepository.IsUnique(registerModel.Username);
           if (userExists == null) return BadRequest(userExists);
            var user = new ApplicationUser
            {
                UserName = registerModel.Username,
                Email = registerModel.Email,
                PasswordHash=registerModel.Password
            };
            var result = await _authenticateRepository.RegisterUser(user);
            if (!result) return StatusCode(StatusCodes.Status500InternalServerError);
            return Ok(new { Message = "Register successfully!!!" });
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult>Login(LoginModel loginModel)
        {
            if(await _authenticateRepository.IsUnique(loginModel.Username)) 
                return BadRequest(new { Message = "Please Register first then login!!!" });
            var users = await _authenticateRepository.AuthenticateUser(loginModel.Username, loginModel.Password);
            if (users == null) return Unauthorized();

            var user = await _userManager.FindByNameAsync(loginModel.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name,user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                };
                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                var token = _tokenService.GetToken(authClaims);
                var refreshToken = _tokenService.GetRefreshToken();
                var tokenInfo = _context.TokenInfo.FirstOrDefault(a => a.Username == user.UserName);
                if (tokenInfo == null)
                {
                    var info = new TokenInfo
                    {
                        Username = user.UserName,
                        RefreshToken = refreshToken,
                        RefreshTokenExpiry = DateTime.Now.AddDays(7)
                    };
                }
                else
                {
                    tokenInfo.RefreshToken = refreshToken;
                    tokenInfo.RefreshTokenExpiry = DateTime.Now.AddDays(7);
                }
                try
                {
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
                return Ok(new LoginResponse
                {
                    Name = user.Name,
                    Username = user.UserName,
                    Token = token.TokenString,
                    RefreshToken = refreshToken,
                    Expiration = token.ValidTo,
                    StatusCode = 1,
                    Message = "Logged In"
                });
            }
            return Ok(
                new LoginResponse
                {
                    StatusCode = 0,
                    Message = "Invalid Username or password",
                    Token = "",
                    Expiration = null
                });
            return Ok(new { Message = "Login successfully!!!" });

        }

    }
}
