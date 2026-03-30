namespace SparkMind.Domain.Models;

public class Lobby(int userId)
{
    private readonly List<Player> _players = [];
    private GameSession _gameSession = new GameSession();
    public string LobbyCode { get; set; } = Guid.NewGuid().ToString()[..5].ToUpper();
    
    public Host Host { get; set; } = new Host { UserId = userId };

    private bool IsPlayerNameTaken(string playerName) =>
        _players.Any(p => string.Equals(p.Name, playerName, StringComparison.CurrentCultureIgnoreCase));

    public Player? TryAddPlayer(string name)
    {
        if (IsPlayerNameTaken(name))
            return null;

        var player = new Player { Name = name };
        _players.Add(player);
        
        return player;
    }

    public void RemovePlayer(Player player)
    {
        _players.Remove(player);
    }
}