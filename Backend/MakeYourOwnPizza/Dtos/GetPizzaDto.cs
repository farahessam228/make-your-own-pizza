namespace MakeYourOwnPizza.Dtos
{
    public class GetPizzaDto
    {
        public Guid PizzaId { get; set; }
        public string PizzaName { get; set; }
        public decimal Price { get; set; }
        public List<GetOrderIngredientDto> Ingredients { get; set; } = new List<GetOrderIngredientDto>();
    }
}
