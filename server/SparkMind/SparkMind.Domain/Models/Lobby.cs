namespace SparkMind.Domain.Models;

public class Lobby(int userId)
{
    private readonly List<Player> _players = [];
    private GameSession _gameSession = new GameSession();
    public string Code { get; set; } = Guid.NewGuid().ToString()[..5].ToUpper();
    
    public Host Host { get; set; } = new Host { UserId = userId };


    public Player AddOrGetPlayer(string name)
    {
        var player = _players.FirstOrDefault(p => p.Name == name);
        if (player != null)
            return player;
        
        player = new Player { Name = name, Lobby = this};
        _players.Add(player);
        
        return player;
    }

    public void RemovePlayer(Player player)
    {
        _players.Remove(player);
    }
}