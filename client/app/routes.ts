import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/LandingLayout.tsx", [
        index("pages/Home.tsx"),
    ]),
    layout("layouts/AuthLayout.tsx", [
        route("library", "pages/Library.tsx"),
        route("editor/:quizId", "pages/Editor.tsx"),
        route("lobby", "pages/Lobby.tsx")
    ])
] satisfies RouteConfig;
