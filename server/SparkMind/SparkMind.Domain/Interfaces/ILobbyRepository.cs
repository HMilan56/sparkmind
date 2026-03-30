using System.Collections.Concurrent;
using SparkMind.Domain.Models;

namespace SparkMind.Domain.Interfaces;

public interface ILobbyRepository
{
    public void Save(Lobby lobby);
    public void Delete(Lobby lobby);
    public Lobby? GetByCode(string code);
    public Lobby? GetByHost(int userId);
}