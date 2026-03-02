import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("pages/Home.tsx"),
    route("library", "pages/Library.tsx"),
    route("editor", "pages/Editor.tsx")
] satisfies RouteConfig;
