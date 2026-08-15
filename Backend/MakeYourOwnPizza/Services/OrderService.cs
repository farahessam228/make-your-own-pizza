using MakeYourOwnPizza.Repositories;
using MakeYourOwnPizza.Dtos;
namespace MakeYourOwnPizza.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<ICollection<GetOrderResponse>> GetOrdersByUserIdAsync(Guid userId, bool isActive)
        {
            ICollection<GetOrderResponse> orders = await _orderRepository.GetOrdersByUserIdAsync(userId, isActive);
            return orders;
        }
    }
}
