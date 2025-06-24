using Azure.Core;
using Games.Application.Commands.GameSession.SubmitGameSessionAnswer;
using Games.Application.Helpers;
using Games.Contracts.Responses;
using Games.Domain.Entities;
using Games.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Moq;

namespace Game.Application.Tests;

public class SubmitGameSessionAnswerCommandHandlerTest
{
    private  DbContextOptions<GamesDbContext> _options = null;
    private readonly Mock<IRandomNumberHelper> _randomNumberHelperMock;
    private readonly Mock<IAnswerHelper> _answerHelperMock;

    public SubmitGameSessionAnswerCommandHandlerTest()
    {
        _randomNumberHelperMock = new Mock<IRandomNumberHelper>();
        _answerHelperMock = new Mock<IAnswerHelper>();

        

    }

    [Fact]

    public async Task Handle_GameSessionIsNull_SubmitGameSessionAnswerAndReturnKeyNotFoundException()
    {

        //Arrange
        _options = new DbContextOptionsBuilder<GamesDbContext>().UseInMemoryDatabase("TestDB_GameSessionIsNUll_SubmitGameSessionAnswer")
            .Options;
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

            Assert.ThrowsAsync<KeyNotFoundException>(act);


        }

        ;




    }


    [Fact]
    public async Task Handle_RunOutOfTime_SubmitGameSessionAnswerAndReturnInvalidOperationException()
    {
        _options = new DbContextOptionsBuilder<GamesDbContext>().UseInMemoryDatabase("TestDB_RunOutOfTime_SubmitGameSessionAnswer")
            .Options;
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

    [Fact]
    public async Task Handle_ValidCommand_SubmitGameSessionAnswerAndReturnSubmitGameSessionAnswerResponse()
    {

        _options = new DbContextOptionsBuilder<GamesDbContext>().UseInMemoryDatabase("TestDB_ValidCommand_SubmitGameSessionAnswer")
            .Options;

        using (var context = new GamesDbContext(_options))
        {
            //Create gameDefinition entity and gameSession entity.
            var gameDefinition = CreateAGameDefinition();
            var gameSession = CreateAGameSession();

            gameSession.GameDefinition = gameDefinition;

            

            await context.GameDefinitions.AddAsync(gameDefinition);
            await context.GameSessions.AddAsync(gameSession);
            await context.SaveChangesAsync();


            _answerHelperMock.Setup(h => h.GenerateCorrectAnswer(gameDefinition.GameRules!, 50)).Returns("Buzz");

            _answerHelperMock.Setup(h => h.ValidatePlayerAnswer("Buzz", "Buzz")).Returns(true);
            _randomNumberHelperMock.Setup(r =>
                    r.GetNextUniqueRandomNumber(gameSession.Id, gameDefinition.MinNumber, gameDefinition.MaxNumber))
                .Returns(52);


            var handler =
                new SubmitGameSessionAnswerCommandHandler(context, _randomNumberHelperMock.Object,
                    _answerHelperMock.Object);

            var command = new SubmitGameSessionAnswerCommand(1, 50, "Buzz");


            //Act

            var result = await handler.Handle(command, CancellationToken.None);

            //Assert

            Assert.IsType<SubmitGameSessionAnswerResponse>(result);
            Assert.Equal(true, result.SubmitGameSessionAnswerDto.IsCorrect);
            Assert.Equal("Buzz", result.SubmitGameSessionAnswerDto.CorrectAnswer);
         
            Assert.Equal(52, result.SubmitGameSessionAnswerDto.NextRandomNumber);
            Assert.Equal(1, result.SubmitGameSessionAnswerDto.Correct);
            Assert.Equal(0, result.SubmitGameSessionAnswerDto.Incorrect);

                //verify mocks were involved

                _answerHelperMock.Verify(h => h.GenerateCorrectAnswer(gameDefinition.GameRules!, 50),Times.Once);
                _randomNumberHelperMock.Verify(h => h.GetNextUniqueRandomNumber(1, gameDefinition.MinNumber, gameDefinition.MaxNumber),Times.Once);


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