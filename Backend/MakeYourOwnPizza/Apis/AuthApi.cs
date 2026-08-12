using MakeYourOwnPizza.Services;
using System;
namespace MakeYourOwnPizza.Apis
{
    public class AuthApi : IAuthApi
    {
        private readonly IServiceProvider _serviceProvider;
        public AuthApi(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        public async Task<Guid?> GetUserIdAsync(string email)
        {
            var authService = (IAuthService)_serviceProvider.GetService(typeof(IAuthService));
            if (authService == null) return null;
            return await authService.CheckEmailExistsAsync(email);
        }
        public async Task<bool> SetUserStatus(Guid userId, bool _isActive)
        {
            var authService = (IAuthService)_serviceProvider.GetService(typeof(IAuthService));
            if (authService == null) return false;
            return await authService.ActivateUser(userId, _isActive);
        }
    }
}
