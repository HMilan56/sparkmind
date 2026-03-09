import { Link } from "react-router";
import { Stack, Typography } from "@mui/material";

export function Welcome() {
  return (
    <div>
      <Typography>Welcome to Sparkmind!</Typography>

      <Stack>
        <Link to={"/library"}>Library</Link>
        <Link to={"/editor/1"}>Editor</Link>
        <Link to={"/join"}>Join</Link>
        <Link to={"/lobby"}>Lobby</Link>
        <Link to={"/game"}>Game</Link>
      </Stack>
    </div>
  );
}