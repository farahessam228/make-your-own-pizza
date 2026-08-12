using MakeYourOwnPizza.Dtos;
namespace MakeYourOwnPizza.Services
{
    public interface IAuthService
    {
        Task<RegisterResult> RegisterUserAsync(RegisterDto registerDto);
        Task<string?> LoginUserAsync(LoginDto loginDto);

        Task<Guid?> CheckEmailExistsAsync(string email);

        Task<bool>ActivateUser(Guid userId,bool _isActive);
    }
}
