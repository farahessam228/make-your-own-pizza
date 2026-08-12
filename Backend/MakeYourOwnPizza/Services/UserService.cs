using MakeYourOwnPizza.Data;
using MakeYourOwnPizza.Models;
using MakeYourOwnPizza.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MakeYourOwnPizza.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _db;
        public UserService(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _db.User.ToListAsync();
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _db.User.FindAsync(id);
        }

        public async Task<bool> UpdateAsync(Guid id, UpdateUserDto dto)
        {
            var existing = await _db.User.FindAsync(id);
            if (existing == null) return false;

            // Apply partial updates only for provided fields
            if (!string.IsNullOrEmpty(dto.firstName)) existing.firstName = dto.firstName;
            if (!string.IsNullOrEmpty(dto.lastName)) existing.lastName = dto.lastName;
            if (!string.IsNullOrEmpty(dto.email)) existing.email = dto.email;
            if (!string.IsNullOrEmpty(dto.phone)) existing.phone = dto.phone;
            if (!string.IsNullOrEmpty(dto.address)) existing.address = dto.address;
            if (dto.role.HasValue) existing.role = dto.role.Value;
            if (dto.isActive.HasValue) existing.isActive = dto.isActive.Value;
            if (dto.isDeleted.HasValue) existing.isDeleted = dto.isDeleted.Value;
            if (!string.IsNullOrEmpty(dto.refreshToken)) existing.refreshToken = dto.refreshToken;
            if (dto.refreshTokenExpiryTime.HasValue) existing.refreshTokenExpiryTime = dto.refreshTokenExpiryTime.Value;

            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var existing = await _db.User.FindAsync(id);
            if (existing == null) return false;
            // Soft delete: mark the user as deleted instead of removing from the DB
            existing.isDeleted = true;
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
