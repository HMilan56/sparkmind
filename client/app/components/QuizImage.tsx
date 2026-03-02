import { Box } from "@mui/material";

export type QuizImageProps = {
    src: string,
    label: string,
    width?: string | number,
    height?: string | number
};

export function QuizImage({ src, label, width = "100%", height = "auto" }: QuizImageProps) {
    return (
        <img width={width} height={height} src={src} />
    );
}