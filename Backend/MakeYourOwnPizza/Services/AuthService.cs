using MakeYourOwnPizza.Dtos;
using MakeYourOwnPizza.Models;
using MakeYourOwnPizza.Repositories;
using MakeYourOwnPizza.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace MakeYourOwnPizza.Services
{
    public class AuthService : IAuthService
    {
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        public AuthService(IPasswordHasher<User> passwordHasher, IAuthRepository authRepository, IConfiguration configuration)
        {
            _passwordHasher = passwordHasher;
            _authRepository = authRepository;
            _configuration = configuration;
        }

        private string GenerateJwtToken(User user)
        {
      var claims = new[]
{
    new Claim(
        ClaimTypes.NameIdentifier,
        user.Id.ToString()
    ),

    new Claim(
        ClaimTypes.Email,
        user.email
    ),

    new Claim(
        ClaimTypes.Role,
        user.role.ToString()
    )

};
            var key = new SymmetricSecurityKey(
    Encoding.UTF8.GetBytes(
        _configuration["Jwt:Key"]!
    )
);
    var credentials = new SigningCredentials(
    key,
    SecurityAlgorithms.HmacSha256
);
     var token = new JwtSecurityToken(
    issuer: _configuration["Jwt:Issuer"],
    audience: _configuration["Jwt:Audience"],
    claims: claims,
    expires: DateTime.UtcNow.AddMinutes(60),
    signingCredentials: credentials
);
            return new JwtSecurityTokenHandler()
    .WriteToken(token);
        }
        public async Task<RegisterResult> RegisterUserAsync(RegisterDto registerDto)
        {
            if (registerDto.role != Role.Customer && registerDto.role != Role.Delivery)
            {
                return RegisterResult.InvalidRole;
            }
            bool emailExists = await _authRepository.UserExistsAsync(registerDto.email);
            if (emailExists)
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
            if (!created)
            {
                return RegisterResult.EmailAlreadyExists;
            }
            return RegisterResult.Success;
        }


        public async Task<string?> LoginUserAsync(LoginDto loginDto)
        {
            var user = await _authRepository.GetUserByEmailAsync(loginDto.email);
            if (user == null)
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }
            var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(user, user.password, loginDto.password);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }
            // Generate JWT token
            var token = GenerateJwtToken(user);
            return token;

        }

    }
}