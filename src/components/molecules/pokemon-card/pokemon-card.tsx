import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

export interface PokemonCardProps {
  title?: string;
  imageSrc: string;
}

export default function PokemonCard(props: PokemonCardProps) {
  return (
    <Link href={props.title ? `/pokemon/${props.title}` : "#"}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            height={props.title ? 140 : 350}
            image={props.imageSrc}
            alt="green iguana"
          />
          {props.title && (
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          )}
        </CardActionArea>
      </Card>
    </Link>
  );
}
