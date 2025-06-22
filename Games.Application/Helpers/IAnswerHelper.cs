using Games.Domain.Entities;

namespace Games.Application.Helpers;

public interface IAnswerHelper
{
    public string GenerateCorrectAnswer(IEnumerable<GameRule> gameRules, int randomNumber);
    public bool ValidatePlayerAnswer(string correctAnswer, string playerAnswer);

}