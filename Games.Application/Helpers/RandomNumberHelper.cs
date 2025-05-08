namespace Games.Application.Helpers;

public static class RandomNumberHelper
{

    private static readonly Random _random = new Random();
    private static readonly Dictionary<int,HashSet<int>> _useNumber = new Dictionary<int,HashSet<int>>();

    public static int GetNextUniqueRandomNumber(int sessionId, int min, int max)
    {

        if (!_useNumber.TryGetValue(sessionId, out var used))
        {

            used = new HashSet<int>();
            _useNumber[sessionId] = used;
        }

        if (used.Count >= (max - min + 1))
        {

            throw new InvalidOperationException("No more numbers left in this session.");
        }



        int candidate = 0;

        do
        {
            candidate = _random.Next(min, max + 1);
        } while (used.Contains(candidate));

        used.Add(candidate);


        return candidate;
    }



}