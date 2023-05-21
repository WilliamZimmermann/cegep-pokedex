"use client";

import PokemonCard from "@/components/molecules/pokemon-card/pokemon-card";
import styles from "./page.module.css";
import { Container, Grid } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <PokemonCard title="Pikachu" imageSrc="pikachu.png" />
          </Grid>
          <Grid item xs={3}>
            <PokemonCard title="Charmander" imageSrc="charmander.png" />
          </Grid>
          <Grid item xs={3}>
            <PokemonCard title="Psyduck" imageSrc="psyduck.png" />
          </Grid>
          <Grid item xs={3}>
            <PokemonCard title="Bulbassaur" imageSrc="bulbassaur.png" />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
