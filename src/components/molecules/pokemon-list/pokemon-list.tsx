"use client";

import PokemonCard from "@/components/molecules/pokemon-card/pokemon-card";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PokemonListAPI } from "@/types/pokemon";
import { getData } from "@/api/pokemon-api";

interface PokemonListProps {
  data: PokemonListAPI;
}

export default function PokemonList(props: PokemonListProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const [pokemonList, setPokemonList] = useState<PokemonListAPI>(props.data);
  const [totalPages, setTotalPages] = useState<number>(
    props.data.count ? Math.ceil(props.data.count / 8) : 1
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <Container fixed>
      {loading ? (
        <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              {pokemonList?.results.map((pokemon) => (
                <Grid item xs={3} key={pokemon.name}>
                  <PokemonCard apiUrl={pokemon.url} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page: number) => {
                setLoading(true);

                const offset = (page - 1) * 8;
                setCurrentPage(page);

                getData(
                  `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${offset}`
                )
                  .then((apiReturn) => {
                    setPokemonList(apiReturn);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
}
