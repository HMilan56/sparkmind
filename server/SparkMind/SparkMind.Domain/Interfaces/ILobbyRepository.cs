using System.Collections.Concurrent;
using SparkMind.Domain.Models;

namespace SparkMind.Domain.Interfaces;

public interface ILobbyRepository
{
    public void Save(Lobby lobby);

    public Lobby? GetByCode(string code);
    
    public Lobby? GetByHostId(int hostId);

    public void Delete(string code);
}