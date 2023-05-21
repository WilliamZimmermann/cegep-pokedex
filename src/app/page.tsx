"use client";

import PokemonCard from "@/components/molecules/pokemon-card/pokemon-card";
import styles from "./page.module.css";
import { Box, Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { PokemonList } from "@/types/pokemon-api";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonList, setPokemonList] = useState<PokemonList>();

  async function getData(url: string) {
    const res = await fetch(url);
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
      getApiData("https://pokeapi.co/api/v2/pokemon?limit=8&offset=0");
    }
  }, [loading]);

  function getApiData(url: string) {
    setLoading(true);

    getData(url)
      .then((apiReturn) => {
        setPokemonList(apiReturn);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <main className={styles.main}>
      <Container fixed>
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            {pokemonList?.results.map((pokemon) => (
              <Grid item xs={3} key={pokemon.name}>
                <PokemonCard title={pokemon.name} imageSrc="pikachu.png" />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ mt: 2 }}>
          Total: {pokemonList?.count}
          <Button
            variant="outlined"
            disabled={pokemonList?.previous ? false : true}
            onClick={() => {
              if (pokemonList?.previous) {
                getApiData(pokemonList?.previous);
              }
            }}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            disabled={pokemonList?.next ? false : true}
            onClick={() => {
              if (pokemonList?.next) {
                getApiData(pokemonList?.next);
              }
            }}
          >
            Next
          </Button>
        </Box>
      </Container>
    </main>
  );
}
