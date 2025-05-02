namespace Games.Domain.Entities;

public class GameRule
{

    public int Id { get; set; }
    public int Divisor { get; set; } = 0;
    public string Word {get; set; } = string.Empty;
    public GameDefinition? GameDefinition { get; set; }
    
}