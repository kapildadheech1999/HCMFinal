using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HcmMember.Migrations
{
    public partial class SeedPhysician : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Physicians",
                columns: new[] { "PhysicianId", "PhysicianName", "PhysicianState" },
                values: new object[,]
                {
                    { 1, "John", "UT" },
                    { 2, "Hari", "UA" },
                    { 3, "Mittal", "TX" },
                    { 4, "Patrick", "OH" },
                    { 5, "Mark", "CA" },
                    { 6, "Jessica", "NY" },
                    { 7, "Mary", "IL" },
                    { 8, "Stacy", "FL" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Physicians",
                keyColumn: "PhysicianId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Physicians",
                keyColumn: "PhysicianId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Physicians",
                keyColumn: "PhysicianId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Physicians",
                keyColumn: "PhysicianId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Physicians",
                keyColumn: "PhysicianId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Physicians",
                keyColumn: "PhysicianId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Physicians",
                keyColumn: "PhysicianId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Physicians",
                keyColumn: "PhysicianId",
                keyValue: 8);
        }
    }
}
