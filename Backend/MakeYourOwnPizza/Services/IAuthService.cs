using MakeYourOwnPizza.Dtos;
namespace MakeYourOwnPizza.Services
{
    public interface IAuthService
    {
        Task<RegisterResult> RegisterUserAsync(RegisterDto registerDto);
    }
}
