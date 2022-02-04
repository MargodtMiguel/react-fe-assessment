import { Move, PokemonDetail, PokemonListItem } from '../shared/entities/pokemon.entity';
import { pokemonService } from '../shared/services/pokemon.service';
import LoadingSpinnerComponent from './loading-spinner';
import Image from 'next/image';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

interface Props {
  selectedPokemon: PokemonListItem;
  favoritePokemonName: string;
  setFavoritePokemonName: Dispatch<SetStateAction<string>>;
}

const PokemonDetailComponent: FC<Props> = (props: Props) => {
  const { selectedPokemon, favoritePokemonName, setFavoritePokemonName } = props;

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail>();
  const [showBack, setShowBack] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'pending' | 'resolved' | 'rejected'>('idle');

  useEffect(() => {
    fetchPokemonDetails();
  }, [selectedPokemon]);

  function fetchPokemonDetails(): void {
    setStatus('pending');
    setShowBack(false);

    pokemonService
      .getByName(selectedPokemon.name)
      .then(result => fetchPokemonDetailsSuccessfull(result.data))
      .catch(() => fetchPokemonDetailsFailed());
  }

  function fetchPokemonDetailsSuccessfull(result: PokemonDetail): void {
    setPokemonDetails(result);
    setStatus('resolved');
  }

  function fetchPokemonDetailsFailed(): void {
    setStatus('rejected');
  }

  function toggleShowBack(): void {
    setShowBack(!showBack);
  }

  return (
    <div className="pokemon-details-card">
      {status === 'pending' && <LoadingSpinnerComponent></LoadingSpinnerComponent>}

      {status === 'resolved' && (
        <div className="pokemon-details">
          <div className="pokemon-details__favorite">
            {favoritePokemonName !== pokemonDetails?.name && (
              <button
                type="button"
                className="pokemon-details__favorite__button"
                onClick={() => setFavoritePokemonName(pokemonDetails?.name!)}
              >
                Mark as favorite
              </button>
            )}

            {favoritePokemonName === pokemonDetails?.name && <p>This is your favorite pokemon</p>}
          </div>

          <div className="pokemon-details__info">
            <div className="pokemon-details__image">
              <img src={showBack ? pokemonDetails?.sprites.back_default : pokemonDetails?.sprites.front_default}></img>
              <button className="pokemon-details__image__swap-button" type="button" onClick={() => toggleShowBack()}>
                <Image src="/repeat.svg" width="10" height="10"></Image>
              </button>
            </div>
            <p>
              <strong>
                {pokemonDetails?.id}: {pokemonDetails?.name}
              </strong>
            </p>
            <p>Height: {pokemonDetails?.height}</p>
            <p>Weight: {pokemonDetails?.weight}</p>
          </div>
          <div className="pokemon-details__moves">
            <p className="pokemon-details__moves__title">
              <strong>Moves:</strong>
            </p>
            <ul className="pokemon-details__moves__list">
              {pokemonDetails?.moves.map((move: Move, i) => {
                return (
                  <p key={i} className="pokemon-details__moves__list__item">
                    {move.move.name}
                  </p>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {status === 'rejected' && (
        <div>
          <h2>Failed to fetch details for {selectedPokemon.name}</h2>
          <p>Please try again later</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetailComponent;
