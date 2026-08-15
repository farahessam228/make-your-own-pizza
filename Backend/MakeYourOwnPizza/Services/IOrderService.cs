using MakeYourOwnPizza.Dtos;
namespace MakeYourOwnPizza.Services
{
    public interface IOrderService
    {
        Task<ICollection<GetOrderResponse>>GetOrdersByUserIdAsync(Guid userId, bool isActive);
    }
}
