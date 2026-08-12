namespace MakeYourOwnPizza.Apis
{
    public interface IVerificationApi
    {
        Task<bool> AddEmailVerificationAsync(Guid userId, string otp);

    }
}
