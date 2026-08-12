using MakeYourOwnPizza.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MakeYourOwnPizza.Services
{
    public interface IUserService
    {
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIdAsync(Guid id);
        // Create intentionally omitted - handled by AuthService
        // Update accepts a partial DTO so callers can send only fields they want to change
        Task<bool> UpdateAsync(Guid id, MakeYourOwnPizza.Dtos.UpdateUserDto dto);
        Task<bool> DeleteAsync(Guid id);
    }
}
