namespace Games.Contracts.Requests.GameSessions;

public record CreateGameSessionRequest(string PlayerName, int Duration);