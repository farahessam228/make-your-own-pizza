namespace MakeYourOwnPizza.Models
{
    public class OrderStage
    {
        public Guid Id { get; set; }
        public Guid orderId { get; set; }
        public Order order { get; set; }
        public string stageType { get; set; }
        public DateTimeOffset createdAt { get; set; } = DateTimeOffset.Now;
    }
}
