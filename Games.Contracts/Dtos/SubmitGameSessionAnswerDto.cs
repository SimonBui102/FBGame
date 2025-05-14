namespace Games.Contracts.Dtos;

public record SubmitGameSessionAnswerDto(bool IsCorrect, string CorrectAnswer, int NextRandomNumber, int Correct, int Incorrect);