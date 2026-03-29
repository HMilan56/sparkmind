import * as signalR from '@microsoft/signalr';

export class GameService {
    private readonly connection: signalR.HubConnection;
    private static instance: GameService;

    private constructor(baseUrl: string) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${baseUrl}/game`, {
                accessTokenFactory: () => localStorage.getItem("token") || ""
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }

    public static getInstance(baseUrl: string): GameService {
        if (!GameService.instance) {
            GameService.instance = new GameService(baseUrl);
        }
        return GameService.instance;
    }

    public async start(): Promise<void> {
        if (this.connection.state === signalR.HubConnectionState.Disconnected) {
            await this.connection.start();
        }
    }

    public onConnectionStateChange(callback: (isConnected: boolean) => void) {
        const checkState = () => {
            callback(this.connection.state === signalR.HubConnectionState.Connected);
        };

        this.connection.onreconnecting(checkState);
        this.connection.onreconnected(checkState);
        this.connection.onclose(checkState);

        checkState();
    }

    // Eseménykezelők regisztrálása
    public onPlayerJoined(callback: (name: string) => void) {
        this.connection.on("PlayerJoined", callback);
        return () => this.connection.off("PlayerJoined", callback);
    }

    // Küldés (Invoke)
    public async joinLobby(code: string, nick: string) {
        return this.connection.invoke("JoinLobby", code, nick);
    }

    public async createLobby() {
        try {
            const code: string = await this.connection.invoke<string>("CreateOrGetLobby");
            return code;
        } catch (err) {
            throw new Error(`Service error: ${err}`);
        }
    }

    public get state() {
        return this.connection.state;
    }
}