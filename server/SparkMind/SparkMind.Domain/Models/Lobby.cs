namespace SparkMind.Domain.Models;

public class Lobby(Host host, string lobbyCode)
{
    private readonly List<Player> _players = [];
    private GameSession _gameSession = new GameSession();
    public string LobbyCode { get; set; } = lobbyCode;
    
    public Host Host { get; set; } = host;

    private bool IsPlayerNameTaken(string playerName) =>
        _players.Any(p => string.Equals(p.Name, playerName, StringComparison.CurrentCultureIgnoreCase));

    public bool TryAddPlayer(Player player)
    {
        if (IsPlayerNameTaken(player.Name))
            return false;

        _players.Add(player);
        return true;
    }

    public void RemovePlayer(Player player)
    {
        _players.Remove(player);
    }
}