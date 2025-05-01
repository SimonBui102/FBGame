using Games.Contracts.Dtos;

namespace Games.Contracts.Responses;

public record GetGameDefinitionsResponse(List<GameDefinitionDto> GameDefinitionDtos);