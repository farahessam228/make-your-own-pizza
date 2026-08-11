using MakeYourOwnPizza.Models;
namespace MakeYourOwnPizza.Repositories
{
    public interface IAuthRepository
    {
        Task<bool>CreateUserAsync(User user);
        Task<bool>UserExistsAsync(string email);

        Task<User?> GetUserByEmailAsync(string email);
    }
}
