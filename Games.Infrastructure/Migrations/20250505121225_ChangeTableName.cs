using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Games.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTableName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameRule_GameDefinitions_GameDefinitionId",
                table: "GameRule");

            migrationBuilder.DropForeignKey(
                name: "FK_GameSession_GameDefinitions_GameDefinitionId",
                table: "GameSession");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GameSession",
                table: "GameSession");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GameRule",
                table: "GameRule");

            migrationBuilder.RenameTable(
                name: "GameSession",
                newName: "GameSessions");

            migrationBuilder.RenameTable(
                name: "GameRule",
                newName: "GameRules");

            migrationBuilder.RenameIndex(
                name: "IX_GameSession_GameDefinitionId",
                table: "GameSessions",
                newName: "IX_GameSessions_GameDefinitionId");

            migrationBuilder.RenameIndex(
                name: "IX_GameRule_GameDefinitionId",
                table: "GameRules",
                newName: "IX_GameRules_GameDefinitionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameSessions",
                table: "GameSessions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameRules",
                table: "GameRules",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GameRules_GameDefinitions_GameDefinitionId",
                table: "GameRules",
                column: "GameDefinitionId",
                principalTable: "GameDefinitions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GameSessions_GameDefinitions_GameDefinitionId",
                table: "GameSessions",
                column: "GameDefinitionId",
                principalTable: "GameDefinitions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GameRules_GameDefinitions_GameDefinitionId",
                table: "GameRules");

            migrationBuilder.DropForeignKey(
                name: "FK_GameSessions_GameDefinitions_GameDefinitionId",
                table: "GameSessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GameSessions",
                table: "GameSessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_GameRules",
                table: "GameRules");

            migrationBuilder.RenameTable(
                name: "GameSessions",
                newName: "GameSession");

            migrationBuilder.RenameTable(
                name: "GameRules",
                newName: "GameRule");

            migrationBuilder.RenameIndex(
                name: "IX_GameSessions_GameDefinitionId",
                table: "GameSession",
                newName: "IX_GameSession_GameDefinitionId");

            migrationBuilder.RenameIndex(
                name: "IX_GameRules_GameDefinitionId",
                table: "GameRule",
                newName: "IX_GameRule_GameDefinitionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameSession",
                table: "GameSession",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_GameRule",
                table: "GameRule",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GameRule_GameDefinitions_GameDefinitionId",
                table: "GameRule",
                column: "GameDefinitionId",
                principalTable: "GameDefinitions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GameSession_GameDefinitions_GameDefinitionId",
                table: "GameSession",
                column: "GameDefinitionId",
                principalTable: "GameDefinitions",
                principalColumn: "Id");
        }
    }
}
