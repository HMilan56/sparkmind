import * as signalR from '@microsoft/signalr';
import type { HostUpdateDto } from './types/host';
import type { PlayerStateDto } from './types/player';
import { ServiceFactory } from '../service-factory';

export class GameService {
    private readonly connection: signalR.HubConnection;
    private static instance: GameService | null;

    private constructor(serverUrl: string) {
        const authService = ServiceFactory.getAuthService();

        const httpOptions: signalR.IHttpConnectionOptions = {
            accessTokenFactory: () => authService.getToken() || "",
            transport: signalR.HttpTransportType.WebSockets
        };

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(serverUrl, httpOptions)
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();
    }

    public static getInstance(serverUrl: string): GameService {
        GameService.instance ??= new GameService(serverUrl);
        return GameService.instance;
    }

    public static reset(): void {
        GameService.instance?.stop();
        GameService.instance = null;
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

    public onPlayerUpdate(callback: (state: PlayerStateDto) => void) {
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