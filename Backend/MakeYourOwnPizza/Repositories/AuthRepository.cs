using MakeYourOwnPizza.Repositories;
using MakeYourOwnPizza.Models;
using MakeYourOwnPizza.Data;
using Microsoft.EntityFrameworkCore;

namespace MakeYourOwnPizza.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _context;
        public AuthRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateUserAsync(User user)
        {
            var res = await _context.Database.ExecuteSqlInterpolatedAsync($"""
            INSERT IGNORE INTO User
            (
                Id,
                firstName,
                lastName,
                email,
                password,
                phone,
                address,
                role
            )
            VALUES
            (
                {user.Id},
                {user.firstName},
                {user.lastName},
                {user.email},
                {user.password},
                {user.phone},
                {user.address},
                {user.role.ToString()}
            );
            """);
            return res == 1;
        }
        public async Task<bool> UserExistsAsync(string email)
        {
            return await _context.User.AnyAsync(u => u.email == email);
        }
        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.User
                .FirstOrDefaultAsync(u => u.email == email);
        }
    }
}
