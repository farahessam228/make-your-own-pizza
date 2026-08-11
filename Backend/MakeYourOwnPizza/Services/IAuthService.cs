using MakeYourOwnPizza.Dtos;
namespace MakeYourOwnPizza.Services
{
    public interface IAuthService
    {
        Task<RegisterResult> RegisterUserAsync(RegisterDto registerDto);
        Task<string?> LoginUserAsync(LoginDto loginDto);
    }
}
