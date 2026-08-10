namespace MakeYourOwnPizza.Models
{
    public class Ingredients
    {
        public Guid Id { get; set; }
        public string name { get; set; }
        public decimal stock { get; set; }
        public decimal price { get; set; }
    }
}
