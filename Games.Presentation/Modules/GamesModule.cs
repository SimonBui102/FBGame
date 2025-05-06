using Games.Application.Commands.GameDefinition.CreateGameDefinition;
using Games.Application.Commands.GameSession.CreateGameSession;
using Games.Application.Queries.GameDefinition.GetGameDefinitionById;
using Games.Application.Queries.GameDefinition.GetGameDefinitions;
using Games.Contracts.Requests.GameDefinitions;
using Games.Contracts.Requests.GameSessions;
using MediatR;

namespace Games.Presentation.Modules;

public static class GamesModule
{
    public static void AddGamesEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/games", async (IMediator mediator, CancellationToken ct) =>
        {
            var gameDefinitions = await mediator.Send(new GetGameDefinitionsQuery(), ct);
            return Results.Ok(gameDefinitions);


        }).WithTags("Games");

        app.MapGet("/api/games/{id}", async (IMediator mediator,int id, CancellationToken ct) =>
        {
            var gameDefinition = await mediator.Send(new GetGameDefinitionByIdQuery(id), ct);
            return Results.Ok(gameDefinition);

        }).WithTags("Games");


        app.MapPost("/api/games",
            async (IMediator mediator, CreateGameDefinitionRequest createGameDefinitionRequest, CancellationToken ct)
                =>
            {
                var command = new CreateGameDefinitionCommand(createGameDefinitionRequest.AuthorName,
                    createGameDefinitionRequest.GameName, createGameDefinitionRequest.MinNumber, createGameDefinitionRequest.MaxNumber, createGameDefinitionRequest.Rules);
                var result = await mediator.Send(command, ct);
                return Results.Ok(result); 


            }).WithTags("Games");

        app.MapPost("/api/gamesessions/{gameDefinitionId}",
            async (IMediator mediator, int gameDefinitionId, CreateGameSessionRequest createGameSessionRequest,
                    CancellationToken ct)
                =>
            {
                var command = new CreateGameSessionCommand(createGameSessionRequest.PlayerName,
                    createGameSessionRequest.Duration, gameDefinitionId);

                var result = await mediator.Send(command, ct);
                return Results.Ok(result);


            }).WithTags("GameSession");

    }

}