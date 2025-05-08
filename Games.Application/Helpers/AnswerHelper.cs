using System.Text;
using Games.Domain.Entities;

namespace Games.Application.Helpers;

public static class AnswerHelper
{
    public static string GenerateCorrectAnswer(IEnumerable<GameRule> gameRules, int randomNumber)
    {

        if (gameRules is null)
        {
            throw new ArgumentNullException(nameof(gameRules));
        }

        if (randomNumber < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(randomNumber), "Number must be non-negative");
        }


        var sb = new StringBuilder();

        foreach (var gameRule in gameRules)
        {
            if (gameRule.Divisor == 0)
            {

                throw new InvalidOperationException("GameRule Divisor cannot be zero");
            }

            if (randomNumber % gameRule.Divisor ==0)
            {
                sb.Append(gameRule.Word);
            }


        }


        return sb.Length > 0 ? sb.ToString() : randomNumber.ToString();
    }



    public static bool ValidatePlayerAnswer(string correctAnswer, string playerAnswer)
    {

        if (string.IsNullOrWhiteSpace(playerAnswer))
            return false;

        return string.Equals(playerAnswer.Trim(), correctAnswer.Trim(), StringComparison.OrdinalIgnoreCase);


    }

}