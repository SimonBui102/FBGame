using Games.Contracts.Responses;
using MediatR;

namespace Games.Application.Queries.GameDefinition.GetGameDefinitionById;

public record GetGameDefinitionByIdQuery(int id) : IRequest<GetGameDefinitionByIdResponse>;