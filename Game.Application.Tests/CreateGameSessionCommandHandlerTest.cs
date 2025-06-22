using Games.Application.Commands.GameSession.CreateGameSession;
using Games.Application.Helpers;
using Games.Contracts.Dtos;
using Games.Contracts.Responses;
using Games.Domain.Entities;
using Games.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Game.Application.Tests;

public class CreateGameSessionCommandHandlerTest
{

    private readonly Mock<IRandomNumberHelper> _randomNumberHelperMock;
    private readonly DbContextOptions<GamesDbContext> _options;
 

    public CreateGameSessionCommandHandlerTest()
    {

        _randomNumberHelperMock = new Mock<IRandomNumberHelper>();
        _options = new DbContextOptionsBuilder<GamesDbContext>()
            .UseInMemoryDatabase("TestDb_CreateGameSession")
            .Options;
    }
    [Fact]
    public async Task Handle_GameDefinitionIsNull_AddGameSessionAndThrowException()
    {

        //Arrange 


        using (var context = new GamesDbContext(_options))
        {
            var handler = new CreateGameSessionCommandHandler(context, _randomNumberHelperMock.Object);

            var command = new CreateGameSessionCommand("Test Player", 200, 1);


            //ACT
            var act = () => handler.Handle(command, CancellationToken.None);

            //Assert

            await Assert.ThrowsAsync<Exception>(act);
        };




    }

    [Fact]
    public async Task Handle_ValidCommand_AddGameSessionAndReturnCreateGameSessionResponse()
    {

        //Arrange

        using (var context = new GamesDbContext(_options))
        {
            var rules = new List<GameRule>
            {
                new GameRule{Divisor = 3, Word = "Fizz"},
                new GameRule{ Divisor = 5, Word = "Buzz" }

            };

            var gameDefinition = new GameDefinition
            {
                AuthorName = "Test Author",
                GameName = "Test Game",
                MinNumber = 1,
                MaxNumber = 100,
                CreateDate = DateTime.Now.ToUniversalTime(),
                GameRules = rules


            };

            await context.GameDefinitions.AddAsync(gameDefinition);
            await context.SaveChangesAsync();


            var handler = new CreateGameSessionCommandHandler(context, _randomNumberHelperMock.Object);

            var command = new CreateGameSessionCommand("Test Player", 200, gameDefinition.Id);

            _randomNumberHelperMock
                .Setup(r => r.GetNextUniqueRandomNumber(1, gameDefinition.MinNumber, gameDefinition.MaxNumber))
                .Returns(50);

            //ACT
            var result = await handler.Handle(command,CancellationToken.None);
            //Assert

            var session = await context.GameSessions
                .Include( s => s.GameDefinition)
                .FirstOrDefaultAsync(s => s.Id==result.CreateGameSessionDto.GameSessionId);

                //Assert on handler's response
            Assert.IsType<CreateGameSessionResponse>(result);

            Assert.Equal("Test Player", result.CreateGameSessionDto.PlayerName);
            Assert.Equal(50,result.CreateGameSessionDto.NextRandomNumber);
            Assert.InRange((result.CreateGameSessionDto.EndTime-result.CreateGameSessionDto.StartTime).TotalSeconds, 199.5,201);

                //Verify the session was actually saved in the database:
            Assert.NotNull(session);
            Assert.Equal(gameDefinition.Id, session.GameDefinition!.Id);
            Assert.Equal("Test Player", session.PlayerName);
            Assert.Equal(0, session.NumberOfCorrectAnswer);
            Assert.Equal(0, session.NumberOfIncorrectAnswer);
            Assert.Equal(200,session.Duration.TotalSeconds);

                //Verify our mocked service was called exactly one

            _randomNumberHelperMock
                .Verify( r => r.GetNextUniqueRandomNumber(result.CreateGameSessionDto.GameSessionId,1,100),Times.Once);


        }






    }




}