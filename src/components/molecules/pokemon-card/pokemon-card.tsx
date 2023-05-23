"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface PokemonCardProps {
  name?: string;
  pokemonUrl: string;
}

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

export default function PokemonCard(props: PokemonCardProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemon, setPokemon] = useState<Pokemon>();

  async function getData() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  useEffect(() => {
    if (loading) {
      getData()
        .then((response) => {
          const pokemonFormated = {
            id: response.id,
            name: response.name,
            imageUrl: response.sprites.other["official-artwork"].front_default,
          };
          setPokemon(pokemonFormated);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <Link href={props.name ? `/pokemon/${props.name}` : "#"}>
      <Card>
        <CardActionArea>
          {loading ? (
            <>
              <Skeleton variant="rectangular" height={140} />
              <CardContent>
                <Skeleton />
                <Skeleton width="60%" />
              </CardContent>
            </>
          ) : (
            <>
              <CardMedia
                component="img"
                height={props.name ? 140 : 350}
                image={pokemon?.imageUrl}
                alt={pokemon?.name}
              />
              {props.name && (
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {props?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              )}
            </>
          )}
        </CardActionArea>
      </Card>
    </Link>
  );
}
