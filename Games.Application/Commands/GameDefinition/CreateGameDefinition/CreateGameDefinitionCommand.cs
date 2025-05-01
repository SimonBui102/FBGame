using MediatR;

namespace Games.Application.Commands.GameDefinition.CreateGameDefinition;

public record CreateGameDefinitionCommand(string AuthorName,string GameName): IRequest<int>;