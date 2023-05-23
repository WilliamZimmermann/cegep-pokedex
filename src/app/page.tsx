import PokemonList from "@/components/molecules/pokemon-list/pokemon-list";
import styles from "./page.module.css";
import { getData } from "@/api/pokemon-api";

export default async function Home() {
  const pokemonList = await getData(
    "https://pokeapi.co/api/v2/pokemon?limit=8&offset=0"
  );

  return (
    <main className={styles.main}>
      <PokemonList data={pokemonList} />
    </main>
  );
}
