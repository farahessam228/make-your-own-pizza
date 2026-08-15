using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MakeYourOwnPizza.Migrations
{
    /// <inheritdoc />
    public partial class OrderActive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            
            

            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "Order",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);


            migrationBuilder.CreateIndex(
                name: "IX_Order_userId_isActive",
                table: "Order",
                columns: new[] { "userId", "isActive" });
            migrationBuilder.DropIndex(
                name: "IX_Order_userId",
                table: "Order");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.DropIndex(
                name: "IX_Order_userId_isActive",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "isActive",
                table: "Order");

            

            migrationBuilder.CreateIndex(
                name: "IX_Order_userId",
                table: "Order",
                column: "userId");
        }
    }
}
