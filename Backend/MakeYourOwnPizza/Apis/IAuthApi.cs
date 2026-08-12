namespace MakeYourOwnPizza.Apis
{
    public interface IAuthApi
    {
        Task<Guid?> GetUserIdAsync(string email);
        Task<bool> SetUserStatus(Guid userId,bool _isActive);
    }
}
