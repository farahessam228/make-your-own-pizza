using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MakeYourOwnPizza.Models;
namespace MakeYourOwnPizza.Data.Configurations
{
    public class IngredientConfiguration : IEntityTypeConfiguration<Ingredients>
    {
        public void Configure(EntityTypeBuilder<Ingredients> builder)
        {
            builder.HasKey(i => i.Id);
            builder.Property(i => i.name).IsRequired().HasMaxLength(100);
            builder.Property(i => i.stock).IsRequired();
            builder.Property(i => i.price).IsRequired().HasColumnType("decimal(18,2)");
            builder.Property(i => i.imageUrl).IsRequired().HasMaxLength(200);
            builder.HasMany(i => i.orderIngredients)
                   .WithOne(oi => oi.Ingredient)
                   .HasForeignKey(oi => oi.ingredientId);
        }
    }
}
