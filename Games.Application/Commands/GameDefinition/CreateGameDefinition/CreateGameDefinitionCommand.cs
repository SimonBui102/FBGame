using Games.Contracts.Requests.GameRules;
using MediatR;

namespace Games.Application.Commands.GameDefinition.CreateGameDefinition;

public record CreateGameDefinitionCommand(string AuthorName,string GameName, int MinNumber, int MaxNumber, List<CreateGameRuleRequest> Rules): IRequest<int>;