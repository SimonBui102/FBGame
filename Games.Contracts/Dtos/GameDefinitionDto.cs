namespace Games.Contracts.Dtos;

public record GameDefinitionDto(int Id, string AuthorName, string GameName,int MinNumber,int MaxNumber, DateTime CreateDate, List<GameRuleDto> Rules);
