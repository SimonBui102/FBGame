using Games.Contracts.Responses;
using Games.Infrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Games.Application.Queries.GameDefinition.GetGameDefinitionById;

public class GetGameDefinitionByIdQueryHandler : IRequestHandler<GetGameDefinitionByIdQuery, GetGameDefinitionByIdResponse>
{
    private readonly GamesDbContext _gamesDbContext;
    public GetGameDefinitionByIdQueryHandler(GamesDbContext gamesDbContext)
    {
        _gamesDbContext = gamesDbContext;

    }
    public async Task<GetGameDefinitionByIdResponse> Handle(GetGameDefinitionByIdQuery request, CancellationToken cancellationToken)
    {
        var gameDefinition = await _gamesDbContext.GameDefinitions
            .Include(g => g.GameRules)
            .FirstOrDefaultAsync(x => x.Id == request.id, cancellationToken);

        if (gameDefinition is null)
        {

            throw new Exception();
        }

        return gameDefinition.Adapt<GetGameDefinitionByIdResponse>();
    }
}