using MakeYourOwnPizza.Dtos;
namespace MakeYourOwnPizza.Repositories
{
    public interface IOrderRepository
    {
        Task<GetOrderDetailsResponse?> GetOrdersDetailsByUserIdAsync(Guid orderId);
        Task<ICollection<GetOrderResponse>> GetOrdersByUserIdAsync(Guid userId, bool isActive);
    }
}
