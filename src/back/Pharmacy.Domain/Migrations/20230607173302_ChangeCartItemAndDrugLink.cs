using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pharmacy.Domain.Migrations
{
    /// <inheritdoc />
    public partial class ChangeCartItemAndDrugLink : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Drug",
                table: "CartItems",
                newName: "DrugId");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_DrugId",
                table: "CartItems",
                column: "DrugId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_Drugs_DrugId",
                table: "CartItems",
                column: "DrugId",
                principalTable: "Drugs",
                principalColumn: "DrugId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_Drugs_DrugId",
                table: "CartItems");

            migrationBuilder.DropIndex(
                name: "IX_CartItems_DrugId",
                table: "CartItems");

            migrationBuilder.RenameColumn(
                name: "DrugId",
                table: "CartItems",
                newName: "Drug");
        }
    }
}
