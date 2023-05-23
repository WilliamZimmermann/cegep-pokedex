"use client";

import { PokemonListAPI } from "@/types/pokemon-api";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import PokemonCard from "../pokemon-card/pokemon-card";
import { getData } from "@/api/pokemon-api";

interface PokemonListProps {
  data: PokemonListAPI;
}

export default function PokemonList(props: PokemonListProps) {
  const [pokemonList, setPokemonList] = useState<PokemonListAPI>(props.data);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(props.data.count ? props.data.count / 8 : 1)
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (props.data) {
      setLoading(false);
    }
  }, [props.data]);

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
    <Container fixed>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              {pokemonList?.results.map((pokemon) => (
                <Grid item xs={3} key={pokemon.name}>
                  <PokemonCard name={pokemon.name} pokemonUrl={pokemon.url} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Pagination
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={(e, page) => {
                const offset = (page - 1) * 8;
                setCurrentPage(page);

                getApiData(
                  `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${offset}`
                );
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
}
