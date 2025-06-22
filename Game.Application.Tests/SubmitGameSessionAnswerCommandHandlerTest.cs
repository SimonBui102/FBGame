using Azure.Core;
using Games.Application.Commands.GameSession.SubmitGameSessionAnswer;
using Games.Application.Helpers;
using Games.Domain.Entities;
using Games.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Game.Application.Tests;

public class SubmitGameSessionAnswerCommandHandlerTest
{
    private readonly DbContextOptions<GamesDbContext> _options;
    private readonly Mock<IRandomNumberHelper> _randomNumberHelperMock;
    private readonly Mock<IAnswerHelper> _answerHelperMock;

    public SubmitGameSessionAnswerCommandHandlerTest()
    {
        _randomNumberHelperMock = new Mock<IRandomNumberHelper>();
        _answerHelperMock = new Mock<IAnswerHelper>();

        _options = new DbContextOptionsBuilder<GamesDbContext>().UseInMemoryDatabase("TestDB_SubmitGameSessionAnswer")
            .Options;

    }

    [Fact]

    public async Task Handle_GameSessionIsNull_SubmitGameSessionAnswerAndReturnKeyNotFoundException()
    {

        //Arrange

        using (var context = new GamesDbContext(_options))
        {
            //Create gameDefinition entity and gameSession entity.
            var gameDefinition = CreateAGameDefinition();
            var gameSession = CreateAGameSession();

            gameSession.GameDefinition = gameDefinition;

            await context.GameDefinitions.AddAsync(gameDefinition);
            await context.GameSessions.AddAsync(gameSession);
            await context.SaveChangesAsync();

            var handler =
                new SubmitGameSessionAnswerCommandHandler(context, _randomNumberHelperMock.Object,
                    _answerHelperMock.Object);

            var command = new SubmitGameSessionAnswerCommand(2, 50, "Buzz");


            //Act

            var act = () => handler.Handle(command, CancellationToken.None);

            //Assert

            await Assert.ThrowsAsync<KeyNotFoundException>(act);


        }

        ;




    }


    [Fact]
    public async Task Handle_RunOutOfTime_SubmitGameSessionAnswerAndReturnInvalidOperationException()
    {

        using (var context = new GamesDbContext(_options))
        {
            //Create gameDefinition entity and gameSession entity.
            var gameDefinition = CreateAGameDefinition();
            var gameSession = CreateAGameSession();

            gameSession.GameDefinition = gameDefinition;

            gameSession.EndTime = gameSession.EndTime - TimeSpan.FromSeconds(250);

            await context.GameDefinitions.AddAsync(gameDefinition);
            await context.GameSessions.AddAsync(gameSession);
            await context.SaveChangesAsync();

            var handler =
                new SubmitGameSessionAnswerCommandHandler(context, _randomNumberHelperMock.Object,
                    _answerHelperMock.Object);

            var command = new SubmitGameSessionAnswerCommand(1, 50, "Buzz");


            //Act

            var act = () => handler.Handle(command, CancellationToken.None);

            //Assert

            await Assert.ThrowsAsync<InvalidOperationException>(act);


        }

        ;


    }

    public GameDefinition CreateAGameDefinition()
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

        return gameDefinition;

    }

    public GameSession CreateAGameSession()
    {

        var newGameSession = new GameSession
        {
            PlayerName = "Test Player",
            StartTime = DateTime.Now.ToUniversalTime(),
            Duration = TimeSpan.FromSeconds(200),
            EndTime = DateTime.Now.ToUniversalTime() + TimeSpan.FromSeconds(200),
            NumberOfCorrectAnswer = 0,
            NumberOfIncorrectAnswer = 0,



        };

        return newGameSession;
    }

}