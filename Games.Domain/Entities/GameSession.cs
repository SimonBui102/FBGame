namespace Games.Domain.Entities;

public class GameSession
{

    public int Id { get; set; }
    public string PlayerName { get; set; } = "Default Name";
    public DateTime StartTime { get; set; }
    public TimeSpan Duration { get; set; }
    public DateTime EndTime { get; set; }
    public int  NumberOfCorrectAnswer { get; set; }
    public int  NumberOfIncorrectAnswer { get; set; }

    public GameDefinition? GameDefinition { get; set; }

}