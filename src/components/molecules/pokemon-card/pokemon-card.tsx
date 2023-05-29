"use client";

import { getData } from "@/api/pokemon-api";
import { PokemonApi } from "@/types/pokemon";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";

export interface PokemonCardProps {
  apiUrl: string;
}

export default function PokemonCard(props: PokemonCardProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<PokemonApi>();

  useEffect(() => {
    if (loading) {
      getData(props.apiUrl)
        .then((apiResult) => {
          setPokemon({
            id: apiResult.id,
            name: apiResult.name,
            imageUrl: apiResult.sprites.other["official-artwork"].front_default,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <Link href={pokemon?.name ? `/pokemon/${pokemon?.name}` : "#"}>
      <Card>
        <CardActionArea>
          {loading ? (
            <>
              <Skeleton animation="wave" height={140} />
              <CardContent>
                <Skeleton animation="wave" height={40} />
                <Skeleton animation="wave" height={100} />
              </CardContent>
            </>
          ) : (
            <>
              <CardMedia
                component="img"
                height={140}
                image={pokemon?.imageUrl}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pokemon?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </>
          )}
        </CardActionArea>
      </Card>
    </Link>
  );
}
