using Games.Contracts.Responses;
using Games.Infrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Games.Application.Queries.GameDefinition.GetGameDefinitions;

public class GetGameDefinitionsQueryHandler : IRequestHandler<GetGameDefinitionsQuery, GetGameDefinitionsResponse>
{
    private readonly GamesDbContext _gamesDbContext;
    public GetGameDefinitionsQueryHandler(GamesDbContext gamesDbContext)
    {
        _gamesDbContext= gamesDbContext;
    }
    public async Task<GetGameDefinitionsResponse> Handle(GetGameDefinitionsQuery request, CancellationToken cancellationToken)
    {
        var gameDefinitions = await _gamesDbContext.GameDefinitions.Include( g => g.GameRules)
            .ToListAsync(cancellationToken);

        
        

        return gameDefinitions.Adapt<GetGameDefinitionsResponse>();

    }
}