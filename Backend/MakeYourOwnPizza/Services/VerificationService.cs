using MakeYourOwnPizza.Repositories;
using MakeYourOwnPizza.Apis;
using MakeYourOwnPizza.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
namespace MakeYourOwnPizza.Services
{
    public class VerificationService : IVerificationService
    {
        private readonly IVerificationRepository _verificationRepository;
        private readonly IAuthApi _authApi;
        private readonly IPasswordHasher<User> _passwordHasher;
        public VerificationService(IVerificationRepository verificationRepository, IAuthApi authApi, IPasswordHasher<User> passwordHasher)
        {
            _verificationRepository = verificationRepository;
            _authApi = authApi;
            _passwordHasher = passwordHasher;
        }
        public async Task<bool> VerifyEmailAsync(Guid userId, string otp)
        {
            EmailVerification? emailVerification = await _verificationRepository.GetEmailVerificationByUserIdAsync(userId);
            if (emailVerification == null)
            {
                return false;
            }

            if (emailVerification.IsUsed)
            {
                return false;
            }

            if (emailVerification.ExpiresAt < DateTime.UtcNow)
            {
                return false;
            }

            var dummyUser = new User { Id = userId };
            var verifyResult = _passwordHasher.VerifyHashedPassword(dummyUser, emailVerification.OtpHash, otp);
            if (verifyResult == PasswordVerificationResult.Success || verifyResult == PasswordVerificationResult.SuccessRehashNeeded)
            {
                emailVerification.IsUsed = true;
                await _verificationRepository.UpdateEmailVerificationAsync(emailVerification);
                bool res = await _authApi.SetUserStatus(userId, true);
                return true;
            }

            return false;
        }

        public async Task<bool> AddEmailVerificationAsync(Guid userId, string otp)
        {
            var dummyUser = new User { Id = userId };
            var hashed = _passwordHasher.HashPassword(dummyUser, otp);

            var existing = await _verificationRepository.GetEmailVerificationByUserIdAsync(userId);
            if (existing == null)
            {
                var ev = new EmailVerification
                {
                    Id = Guid.NewGuid(),
                    UserId = userId,
                    OtpHash = hashed,
                    ExpiresAt = DateTime.UtcNow.AddMinutes(15),
                    IsUsed = false,
                    CreatedAt = DateTime.UtcNow
                };

                await _verificationRepository.AddEmailVerificationAsync(ev);
                return true;
            }

            existing.OtpHash = hashed;
            existing.ExpiresAt = DateTime.UtcNow.AddMinutes(15);
            existing.IsUsed = false;
            existing.CreatedAt = DateTime.UtcNow;
            await _verificationRepository.UpdateEmailVerificationAsync(existing);
            return true;
        }

    }
}
