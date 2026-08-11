using MakeYourOwnPizza.Services;
using Microsoft.AspNetCore.Identity;
using MakeYourOwnPizza.Models;
using MakeYourOwnPizza.Dtos;
using MakeYourOwnPizza.Repositories;
namespace MakeYourOwnPizza.Services
{
    public class AuthService : IAuthService
    {
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAuthRepository _authRepository;
        public AuthService(IPasswordHasher<User> passwordHasher, IAuthRepository authRepository)
        {
            _passwordHasher = passwordHasher;
            _authRepository = authRepository;
        }
        public async Task<RegisterResult> RegisterUserAsync(RegisterDto registerDto)
        {
            if(registerDto.role!= Role.Customer && registerDto.role != Role.Delivery)
            {
                return RegisterResult.InvalidRole;
            }
            bool emailExists = await _authRepository.UserExistsAsync(registerDto.email);
            if(emailExists)
            {
                return RegisterResult.EmailAlreadyExists;
            }
            var user = new User
            {
                Id = Guid.NewGuid(),
                firstName = registerDto.firstName,
                lastName = registerDto.lastName,
                email = registerDto.email,
                phone = registerDto.phone,
                address = registerDto.address,
                role = registerDto.role 
            };
            // Hash the password
            user.password = _passwordHasher.HashPassword(user, registerDto.password);
            
            bool created = await _authRepository.CreateUserAsync(user);
            if(!created)
            {
                return RegisterResult.EmailAlreadyExists;
            }
            return RegisterResult.Success;
        }

    }
}
