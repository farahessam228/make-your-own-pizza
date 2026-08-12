using MakeYourOwnPizza.Services;
namespace MakeYourOwnPizza.Apis
{
    public class VerificationApi : IVerificationApi
    {
        private readonly IVerificationService _verificationService;
        public VerificationApi(IVerificationService verificationService)
        {
            _verificationService = verificationService;
        }
        public async Task<bool> AddEmailVerificationAsync(Guid userId, string otp)
        {
            return await _verificationService.AddEmailVerificationAsync(userId, otp);
        }
    }
}
