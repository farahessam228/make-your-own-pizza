namespace MakeYourOwnPizza.Models
{
    public class Payment
    {
        public Guid Id { get; set; }
        public Guid orderId { get; set; }
        public Order order { get; set; }
        public decimal amount { get; set; }
        
        public string transactionId { get; set; }
        public DateTimeOffset paymentDate { get; set; }
        public string idempotentKey { get; set; }
    }
}
