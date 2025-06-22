namespace Games.Application.Helpers;

public interface IRandomNumberHelper
{

    public int GetNextUniqueRandomNumber(int sessionId, int min, int max);

}