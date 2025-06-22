using Games.Application.Commands.GameDefinition.CreateGameDefinition;
using Games.Contracts.Requests.GameRules;
using Games.Domain.Entities;
using Games.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Moq;

namespace Game.Application.Tests;

public class CreateGameDefinitionCommandHandlerTest
{
    [Fact]
    public async Task Handle_ValidCommand_AddsGameDefinitionWithRulesAndReturnsId()
    {

        //Arrange
        var options = new DbContextOptionsBuilder<GamesDbContext>().UseInMemoryDatabase("TestDb_CreateGameDefinition")
            .Options;


     

        //Create one instance of context, run the handler
        using (var context = new GamesDbContext(options))
        {

            var handler = new CreateGameDefinitionCommandHandler(context);

            var rules = new List<CreateGameRuleRequest>
            {
                new CreateGameRuleRequest(3, "Fizz"),
                new CreateGameRuleRequest(5, "Buzz")


            };

            var command = new CreateGameDefinitionCommand("Test Author", "Test Game", 1, 100, rules);

            //ACT

            var returnedId = await handler.Handle(command, CancellationToken.None);

            //Assert

            var saved = await context.GameDefinitions.Include(g => g.GameRules).SingleAsync();

            Assert.Equal(returnedId,saved.Id);
            Assert.Equal("Test Author", saved.AuthorName);
            Assert.Equal("Test Game", saved.GameName);
            Assert.Equal(1,saved.MinNumber);
            Assert.Equal(100,saved.MaxNumber);

            Assert.Collection(saved.GameRules,

                r =>
                {
                    Assert.Equal(3,r.Divisor);
                    Assert.Equal("Fizz", r.Word);


                },

                r =>
                {
                    Assert.Equal(5,r.Divisor);
                    Assert.Equal("Buzz",r.Word);


                }


            );
        };

      


    }


}