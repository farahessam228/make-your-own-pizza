namespace MakeYourOwnPizza.Services
{
    public interface IOtpService
    {
        string GenerateOtp(int length = 6);
    }
}
