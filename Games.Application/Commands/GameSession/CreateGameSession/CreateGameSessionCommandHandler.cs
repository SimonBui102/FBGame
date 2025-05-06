using Games.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Games.Application.Commands.GameSession.CreateGameSession;

public class CreateGameSessionCommandHandler:IRequestHandler<CreateGameSessionCommand, int>
{

    private readonly GamesDbContext _gamesDbContext;

    public CreateGameSessionCommandHandler(GamesDbContext gamesDbContext)
    {
        _gamesDbContext = gamesDbContext;
    }
    public async Task<int> Handle(CreateGameSessionCommand request, CancellationToken cancellationToken)
    {

        var gameDefinition =
            await _gamesDbContext.GameDefinitions.FirstOrDefaultAsync(g => g.Id == request.GameDefinitionId,
                cancellationToken);

        if (gameDefinition == null)
        {
            throw new Exception("Game Definition is null");
        }

        

        var newGameSession = new Domain.Entities.GameSession
        {
            PlayerName = request.PlayerName,
            StartTime = DateTime.Now.ToUniversalTime(),
            Duration = TimeSpan.FromSeconds(request.Duration),
            EndTime = DateTime.Now.ToUniversalTime() + TimeSpan.FromSeconds(request.Duration),
            NumberOfCorrectAnswer = 0,
            NumberOfIncorrectAnswer = 0,
            GameDefinition = gameDefinition


        };

        await _gamesDbContext.GameSessions.AddAsync(newGameSession,cancellationToken);
        await _gamesDbContext.SaveChangesAsync(cancellationToken);

        return newGameSession.Id;




    }
}