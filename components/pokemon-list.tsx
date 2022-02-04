import { PokemonList, PokemonListItem } from '../shared/entities/pokemon.entity';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  pokemonList: PokemonList;
  selectedPokemon: PokemonListItem;
  setSelectedPokemon: Dispatch<SetStateAction<PokemonListItem | undefined>>;
}

const PokemonListComponent: FC<Props> = (props: Props) => {
  const { pokemonList, selectedPokemon, setSelectedPokemon } = props;

  return (
    <ul className="pokemon-list">
      {pokemonList.results.map((pokemon: PokemonListItem, i) => {
        return (
          <li key={i}>
            <button
              className={`pokemon-list__button ${pokemon === selectedPokemon ? 'pokemon-list__button--selected' : ''}`}
              onClick={() => setSelectedPokemon(pokemon)}
              type="button"
            >
              {pokemon.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonListComponent;
