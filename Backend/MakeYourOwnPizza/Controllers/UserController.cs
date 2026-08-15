using Microsoft.AspNetCore.Mvc;
using MakeYourOwnPizza.Services;
using MakeYourOwnPizza.Models;
using MakeYourOwnPizza.Dtos;
using System;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;

namespace MakeYourOwnPizza.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _service.GetAllAsync();
            var dtos = users.Select(u => new UserDto
            
                firstName = u.firstName,
                lastName = u.lastName,
                email = u.email,
                phone = u.phone,

            }).ToList();

            return Ok(dtos);
        }


        // Create endpoint intentionally omitted. Use AuthController / AuthService for registration.

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateUserDto dto)
        {
            // extract user id from token claims
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(idClaim)) return Unauthorized();
            if (!Guid.TryParse(idClaim, out var userId)) return Unauthorized();

            var updated = await _service.UpdateAsync(userId, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(idClaim)) return Unauthorized();
            if (!Guid.TryParse(idClaim, out var userId)) return Unauthorized();

            var u = await _service.GetByIdAsync(userId);
            if (u == null) return NotFound();
            var dto = new UserDto
            {
                firstName = u.firstName,
                lastName = u.lastName,
                email = u.email,
                phone = u.phone,
                
            };
            return Ok(dto);
        }


        [HttpDelete("me")]
        public async Task<IActionResult> DeleteMe()
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(idClaim)) return Unauthorized();
            if (!Guid.TryParse(idClaim, out var userId)) return Unauthorized();

            var deleted = await _service.DeleteAsync(userId);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
