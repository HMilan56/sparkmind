import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("pages/Home.tsx"),
    ...prefix("host", [
        layout("layouts/HostGuestLayout.tsx", [
            index("pages/Host.tsx")
        ]),
        layout("layouts/HostAuthLayout.tsx", [
            route("library", "pages/Library.tsx"),
            route("editor/:quizId", "pages/Editor.tsx"),
            route("lobby/:quizId", "pages/Lobby.tsx")
        ]),
    ]),

    route("join", "pages/Join.tsx")
] satisfies RouteConfig;
