using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MakeYourOwnPizza.Models;
namespace MakeYourOwnPizza.Data.Configurations
{
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.orderId).IsRequired();
            builder.Property(p => p.amount).IsRequired().HasColumnType("decimal(18,2)");
            builder.Property(p => p.paymentDate).IsRequired();
            builder.Property(p => p.transactionId).IsRequired().HasMaxLength(100);
            builder.Property(p => p.idempotentKey).IsRequired().HasMaxLength(100);
            builder.HasOne(p => p.order)
                .WithMany(o => o.payments)
                .HasForeignKey(p => p.orderId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
