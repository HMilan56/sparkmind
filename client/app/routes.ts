import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("pages/Home.tsx"),
    
    ...prefix("host", [
        index("pages/Host.tsx"),
        
        layout("layouts/HostAuthLayout.tsx", [
            route("library", "pages/Library.tsx"),
            route("editor/:quizId", "pages/Editor.tsx"),

            layout("layouts/HostSignalRLayout.tsx", [
                route("lobby", "pages/Lobby.tsx")
            ])
        ]),
    ]),
    
    route("join", "pages/Join.tsx")
] satisfies RouteConfig;
