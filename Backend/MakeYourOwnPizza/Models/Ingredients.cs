namespace MakeYourOwnPizza.Models
{
    public class Ingredients
    {
        public Guid Id { get; set; }
        public string name { get; set; }
        public decimal stock { get; set; }
        public decimal price { get; set; }
        public string imageUrl { get; set; }
        public ICollection<OrderIngredient> orderIngredients { get; set; } = new HashSet<OrderIngredient>();
    }
}
