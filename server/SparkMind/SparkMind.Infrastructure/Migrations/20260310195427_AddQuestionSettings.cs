using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SparkMind.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestionSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Settings",
                table: "Questions",
                type: "jsonb",
                nullable: false,
                defaultValue: "{}");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Settings",
                table: "Questions");
        }
    }
}
