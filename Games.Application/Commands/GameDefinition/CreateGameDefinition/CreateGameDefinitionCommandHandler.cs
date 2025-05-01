using Games.Infrastructure;
using MediatR;
using Games.Domain.Entities;

namespace Games.Application.Commands.GameDefinition.CreateGameDefinition;

public class CreateGameDefinitionCommandHandler: IRequestHandler<CreateGameDefinitionCommand, int>
{
    private readonly GamesDbContext _gamesDbContext;
    public CreateGameDefinitionCommandHandler(GamesDbContext gamesDbContext)
    {
        _gamesDbContext = gamesDbContext;


    }
    public async Task<int> Handle(CreateGameDefinitionCommand request, CancellationToken cancellationToken)
    {
        var gameDefinition = new Domain.Entities.GameDefinition
        {
            AuthorName = request.AuthorName,
            GameName = request.GameName,
            CreateDate = DateTime.Now.ToUniversalTime()


        };

        
        await _gamesDbContext.GameDefinitions.AddAsync(gameDefinition,cancellationToken);
        await _gamesDbContext.SaveChangesAsync(cancellationToken);

        

        return gameDefinition.Id;

    }
}