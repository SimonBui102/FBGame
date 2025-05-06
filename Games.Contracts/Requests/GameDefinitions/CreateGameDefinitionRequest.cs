using Games.Contracts.Requests.GameRules;

namespace Games.Contracts.Requests.GameDefinitions;

public record CreateGameDefinitionRequest(string AuthorName, string GameName, int MinNumber, int MaxNumber, List<CreateGameRuleRequest> Rules);