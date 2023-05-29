import styles from "./page.module.css";
import PokemonList from "@/components/molecules/pokemon-list/pokemon-list";
import { getData } from "@/api/pokemon-api";

export default async function Home() {
  const data = await getData(
    "https://pokeapi.co/api/v2/pokemon?limit=8&offset=0"
  );

  return (
    <main className={styles.main}>
      <PokemonList data={data} />
    </main>
  );
}
