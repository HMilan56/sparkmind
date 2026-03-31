import { useSignalR } from "~/contexts/SignalRContext";

export function usePlayer() {
    const { gameService, isConnected } = useSignalR();

    const joinLobby = async (lobbyCode: string, nickName: string) => {
         if (!isConnected) return;

        gameService.joinLobby(lobbyCode, nickName);
    };

    return joinLobby;
}