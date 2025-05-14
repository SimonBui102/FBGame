namespace Games.Contracts.Dtos;

public record CreateGameSessionDto(int GameSessionId, string PlayerName, DateTime StartTime, DateTime EndTime, int NextRandomNumber);