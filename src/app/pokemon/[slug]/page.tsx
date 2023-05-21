"use client";

import PokemonCard from "@/components/molecules/pokemon-card/pokemon-card";
import { Box, Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

interface PokemonPageParams {
  params: {
    slug: string;
  };
}

export default function PokemonPage({ params }: PokemonPageParams) {
  return (
    <>
      <Container fixed>
        <Box
          sx={{
            mt: 2,
            mb: 2,
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/">Home</Link>
            <Typography color="text.primary">{params.slug}</Typography>
          </Breadcrumbs>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <PokemonCard imageSrc={`/${params.slug.toLowerCase()}.png`} />
          </Grid>
          <Grid item xs={8}>
            <h1>{params.slug}</h1>
            <hr></hr>
            <Box>
              <p>Test</p>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
