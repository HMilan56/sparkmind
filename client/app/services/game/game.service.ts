import * as signalR from '@microsoft/signalr';
import type { HostUpdateDto } from './types/host';
import type { PlayerUpdateDto } from './types/player';

export class GameService {
    private readonly connection: signalR.HubConnection;
    private static instance: GameService;

    private constructor(serverUrl: string, accessToken: string | null) {
        const httpOptions: signalR.IHttpConnectionOptions = {
            accessTokenFactory: accessToken ? () => accessToken : undefined,
            transport: signalR.HttpTransportType.WebSockets
        };

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(serverUrl, httpOptions)
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }

    public static getInstance(serverUrl: string, accessToken: string | null): GameService {
        if (!GameService.instance) {
            GameService.instance = new GameService(serverUrl, accessToken);
        }
        return GameService.instance;
    }

    public async start(): Promise<void> {
        if (this.connection.state === signalR.HubConnectionState.Disconnected) {
            await this.connection.start();
        }
    }

    public async stop(): Promise<void> {
        if (this.connection.state === signalR.HubConnectionState.Connected) {
            await this.connection.stop();
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

    private on<T>(method: string, callback: (dto: T) => void) {
        this.connection.on(method, callback);
        return () => this.connection.off(method, callback);
    }

    public onPlayerListUpdate(callback: (players: string[]) => void) {
        return this.on("PlayerListUpdate", callback);
    }

    public onHostUpdate(callback: (state: HostUpdateDto) => void) {
        return this.on("HostUpdate", callback);
    }

    public onPlayerUpdate(callback: (state: PlayerUpdateDto) => void) {
        return this.on("PlayerUpdate", callback);
    }

    // Küldés (Invoke)
    public async joinLobby(code: string, nick: string) {
        return this.connection.invoke("JoinLobby", code, nick);
    }

    public async submitAnswer(answer: number) {
        await this.connection.invoke("SubmitAnswer", answer);
    }

    public async requestNextStep() {
        await this.connection.invoke("RequestNextStep");
    }

    public async createLobby(quizId: number) {
        try {
            const code: string = await this.connection.invoke<string>("CreateOrGetLobby", quizId);
            return code;
        } catch (err) {
            throw new Error(`Service error: ${err}`);
        }
    }

    public get state() {
        return this.connection.state;
    }
}