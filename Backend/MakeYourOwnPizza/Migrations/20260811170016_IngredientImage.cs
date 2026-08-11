using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MakeYourOwnPizza.Migrations
{
    /// <inheritdoc />
    public partial class IngredientImage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderIngredient_Ingredients_IngredientId",
                table: "OrderIngredient");

            migrationBuilder.DropIndex(
                name: "IX_OrderIngredient_IngredientId",
                table: "OrderIngredient");

            migrationBuilder.DropColumn(
                name: "IngredientId",
                table: "OrderIngredient");

            migrationBuilder.AddColumn<Guid>(
                name: "IngredientsId",
                table: "OrderIngredient",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_OrderIngredient_IngredientsId",
                table: "OrderIngredient",
                column: "IngredientsId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderIngredient_Ingredients_IngredientsId",
                table: "OrderIngredient",
                column: "IngredientsId",
                principalTable: "Ingredients",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderIngredient_Ingredients_IngredientsId",
                table: "OrderIngredient");

            migrationBuilder.DropIndex(
                name: "IX_OrderIngredient_IngredientsId",
                table: "OrderIngredient");

            migrationBuilder.DropColumn(
                name: "IngredientsId",
                table: "OrderIngredient");

            migrationBuilder.AddColumn<Guid>(
                name: "IngredientId",
                table: "OrderIngredient",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_OrderIngredient_IngredientId",
                table: "OrderIngredient",
                column: "IngredientId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderIngredient_Ingredients_IngredientId",
                table: "OrderIngredient",
                column: "IngredientId",
                principalTable: "Ingredients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
