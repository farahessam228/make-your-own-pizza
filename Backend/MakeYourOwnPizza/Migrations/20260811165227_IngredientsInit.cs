using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MakeYourOwnPizza.Migrations
{
    /// <inheritdoc />
    public partial class IngredientsInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Column `ingredientId` already exists from initial migration (ModelsCreation).
            // Skip adding `IngredientId` to avoid duplicate-column errors on case-insensitive MySQL setups.

            migrationBuilder.AlterColumn<decimal>(
                name: "price",
                table: "Ingredients",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(65,30)");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "Ingredients",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "imageUrl",
                table: "Ingredients",
                type: "varchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            // Index and foreign key for ingredient relationship already exist (created in ModelsCreation).
            // No-op here to avoid duplicate index/foreign key creation.
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Nothing to revert for `IngredientId` because it was not added in Up().

            migrationBuilder.DropColumn(
                name: "imageUrl",
                table: "Ingredients");

            migrationBuilder.AlterColumn<decimal>(
                name: "price",
                table: "Ingredients",
                type: "decimal(65,30)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "Ingredients",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }
    }
}
