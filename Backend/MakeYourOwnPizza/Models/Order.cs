namespace MakeYourOwnPizza.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public Guid userId { get; set; }
        public User user { get; set; }
        public DateTimeOffset createdAt { get; set; }= DateTimeOffset.Now;
        public DateTimeOffset estimatedDelivery { get; set; }= DateTimeOffset.Now;
        public decimal totalPrice { get; set; } = 0;
        public PaymentMethod paymentMethod { get; set; }
        
        public ICollection<OrderItem> orderItems { get; set; } = new HashSet<OrderItem>();
        public ICollection<Payment> payments { get; set; } = new HashSet<Payment>();
        public ICollection<OrderStage> orderStages { get; set; } = new HashSet<OrderStage>();
    }
}
