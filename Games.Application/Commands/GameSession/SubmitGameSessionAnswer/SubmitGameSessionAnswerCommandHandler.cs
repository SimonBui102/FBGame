using Games.Application.Helpers;
using Games.Contracts.Dtos;
using Games.Contracts.Responses;
using Games.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Games.Application.Commands.GameSession.SubmitGameSessionAnswer;

public class SubmitGameSessionAnswerCommandHandler : IRequestHandler<SubmitGameSessionAnswerCommand, SubmitGameSessionAnswerResponse>
{

    private readonly GamesDbContext _gameDbContext;

    public SubmitGameSessionAnswerCommandHandler(GamesDbContext gamesDbContext)
    {
        _gameDbContext = gamesDbContext;
        
    }

    public async Task<SubmitGameSessionAnswerResponse> Handle(SubmitGameSessionAnswerCommand request, CancellationToken cancellationToken)
    {
        var gameSession = await _gameDbContext.GameSessions
            .Include(s => s.GameDefinition)
            .ThenInclude(d => d.GameRules)
            .FirstOrDefaultAsync(s => s.Id == request.GameSessionId, cancellationToken);

        if (gameSession is null)
        {
            throw new KeyNotFoundException($"Could not find game session with id:{request.GameSessionId}");
        }

        if (DateTime.Now.ToUniversalTime() > gameSession.EndTime)
        {
            throw new InvalidOperationException("Game session has already ended");
        }

        var rules = gameSession.GameDefinition!.GameRules;

        
        // Generate Correct Answer
        var correctAnswer = AnswerHelper.GenerateCorrectAnswer(rules, request.RandomNumber);
        //Check if it is Correct
            // If its correct then increase the NumberOfCorrect in the game session entity
            // If its incorrect then increase the NumberOfCorrect in the game session entiy
            var isPlayerAnswerCorrect = AnswerHelper.ValidatePlayerAnswer(correctAnswer, request.PlayerAnswer);
            if (isPlayerAnswerCorrect)
            {
                gameSession.NumberOfCorrectAnswer++;
            }
            else
            {
                gameSession.NumberOfIncorrectAnswer++;
            }
            //Save change async.
           await _gameDbContext.SaveChangesAsync(cancellationToken);
           var randomNumber =
               RandomNumberHelper.GetNextUniqueRandomNumber(gameSession.Id, gameSession.GameDefinition.MinNumber,
                   gameSession.GameDefinition.MaxNumber);
        //Create a variable has a type of SubmitGameSessionAnswerResponse.
        //Get NextNumber
        // CorrectAnswer
        // Correct
        // InCorrect
        var response = new SubmitGameSessionAnswerResponse(new SubmitGameSessionAnswerDto(isPlayerAnswerCorrect,
            correctAnswer, randomNumber, gameSession.NumberOfCorrectAnswer, gameSession.NumberOfIncorrectAnswer));
        // Return the variable.








        return response;
    }
}