namespace MakeYourOwnPizza.Dtos
{
    public class GetOrderResponse
    {
        public Guid OrderId { get; set; }
        public decimal TotalPrice { get; set; }
       
        public decimal PizzaCount { get; set; }
        public DateTimeOffset CreatedAt { get; set; }

        public string Status { get; set; }
    }
}
