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
            MinNumber = request.MinNumber,
            MaxNumber = request.MaxNumber,
            CreateDate = DateTime.Now.ToUniversalTime(),
            GameRules = request.Rules.Select(rule => new GameRule{Divisor = rule.Divisor, Word = rule.Word}).ToList()


        };

        
        await _gamesDbContext.GameDefinitions.AddAsync(gameDefinition,cancellationToken);
        await _gamesDbContext.SaveChangesAsync(cancellationToken);

    
        


        return gameDefinition.Id;

    }
}