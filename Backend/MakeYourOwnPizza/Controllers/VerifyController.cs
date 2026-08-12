using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MakeYourOwnPizza.Dtos;
using MakeYourOwnPizza.Services;
using MakeYourOwnPizza.Apis;
namespace MakeYourOwnPizza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerifyController : ControllerBase
    {
        private readonly IVerificationService _verifyService;
        private readonly IAuthApi _authApi;
        public VerifyController(IVerificationService verifyService, IAuthApi authApi)
        {
            _verifyService = verifyService;
            _authApi = authApi;
        }
        [HttpPost("verify")]
        public async  Task<IActionResult> Verify([FromBody] CheckEmailDto request)
        {
            Guid? userId = await _authApi.GetUserIdAsync(request.email);
            if(userId == null)
            {
                return NotFound(new { message = "User not found" });
            }
            var result = await _verifyService.VerifyEmailAsync(userId.Value, request.otp);
            if(result)
            {
                return Ok(new { message = "Email verified successfully" });
            }
            
            return BadRequest(new { message = "Invalid OTP" });
            
        }
    }
}
