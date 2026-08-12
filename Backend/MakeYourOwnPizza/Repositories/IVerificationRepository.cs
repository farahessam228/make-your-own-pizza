using MakeYourOwnPizza.Models;
namespace MakeYourOwnPizza.Repositories
{
    public interface IVerificationRepository
    {
        Task<EmailVerification?> GetEmailVerificationByUserIdAsync(Guid userId);
        
        Task AddEmailVerificationAsync(EmailVerification emailVerification);
        Task UpdateEmailVerificationAsync(EmailVerification emailVerification);
    }
}
