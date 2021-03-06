using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
public class AccountController : BaseApiController
{
    private readonly DataContext _dataContext;
    private readonly ITokenService _tokenService;

    public AccountController(DataContext dataContext, ITokenService tokenService)
    {
        _dataContext = dataContext;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto?>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username!))
        {
            return BadRequest("User is taken");
        }
        using var hmac = new HMACSHA512();
        var user = new AppUser()
        {
            UserName = registerDto.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };
        _dataContext.Users.Add(user);
        await _dataContext.SaveChangesAsync();
        return new UserDto {
            Username = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }

    private async Task<bool> UserExists(string username)
    {
        return await _dataContext.Users.AnyAsync(user => user.UserName == username.ToLower());
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto?>> Login(LoginDto loginDto)
    {
        var user = await _dataContext.Users.SingleOrDefaultAsync(user => user.UserName == loginDto.Username.ToLower());
        if (user == null)
        {
            return Unauthorized("Invalid user");
        }
        using var hmac = new HMACSHA512(user.PasswordSalt!);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash![i])
            {
                return Unauthorized("Invalid password");
            }
        }
        return new UserDto {
            Username = user.UserName!,
            Token = _tokenService.CreateToken(user)
        };
    }
}
