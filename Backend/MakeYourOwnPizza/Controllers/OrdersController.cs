using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MakeYourOwnPizza.Services;
using MakeYourOwnPizza.Dtos;
using Microsoft.AspNetCore.Authorization;
using MakeYourOwnPizza.Utilities;
namespace MakeYourOwnPizza.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [Authorize(Roles = "Customer")]
        [HttpGet]
        public async Task<ActionResult<ICollection<GetOrderResponse>>> GetOrdersByUserId( [FromQuery] bool isActive)
        {
            var userId = User.GetUserId();
            ICollection<GetOrderResponse> orders = await _orderService.GetOrdersByUserIdAsync(userId, isActive);
            if(orders == null || orders.Count == 0)
                return NotFound("No orders found for the user.");
            return Ok(orders);
        }
    }
}
