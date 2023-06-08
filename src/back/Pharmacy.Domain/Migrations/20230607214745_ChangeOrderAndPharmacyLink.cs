using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pharmacy.Domain.Migrations
{
    /// <inheritdoc />
    public partial class ChangeOrderAndPharmacyLink : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Orders_PharmacyId",
                table: "Orders",
                column: "PharmacyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Apteki_PharmacyId",
                table: "Orders",
                column: "PharmacyId",
                principalTable: "Apteki",
                principalColumn: "AptekaId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Apteki_PharmacyId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_PharmacyId",
                table: "Orders");
        }
    }
}
