using MakeYourOwnPizza.Models;
namespace MakeYourOwnPizza.Dtos
{
    public class GetOrderDetailsResponse
    {
        public Guid OrderId { get; set; }
        public decimal TotalPrice { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public string CustomerPhone { get; set; }
        public string status { get; set; }
        public List<GetPizzaDto> Pizzas { get; set; } = new List<GetPizzaDto>();
    }
}
