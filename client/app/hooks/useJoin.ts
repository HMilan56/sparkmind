import { useSignalR } from "~/contexts/SignalRContext";

export function useJoin() {
    const { connection, isConnected } = useSignalR();

    const joinLobby = async (lobbyCode: string, nickName: string) => {
         if (!isConnected || !connection) return;

        connection.invoke("JoinLobby", lobbyCode, nickName);
    };

    return joinLobby;
}