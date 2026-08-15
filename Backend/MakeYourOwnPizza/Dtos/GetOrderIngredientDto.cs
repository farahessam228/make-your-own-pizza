namespace MakeYourOwnPizza.Dtos
{
    public class GetOrderIngredientDto
    {
        public Guid IngredientId { get; set; }
        public string IngredientName { get; set; }
        public decimal Quantity { get; set; }
    }
}
