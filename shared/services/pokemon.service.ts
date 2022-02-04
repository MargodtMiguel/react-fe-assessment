import { PokemonDetail, PokemonList } from '../entities/pokemon.entity';
import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonService = {
  getAll,
  getByName
};

function getAll(): Promise<AxiosResponse<PokemonList>> {
  return axios.get<PokemonList>(`${BASE_URL}/pokemon`);
}

function getByName(name: string): Promise<AxiosResponse<PokemonDetail>> {
  return axios.get<PokemonDetail>(`${BASE_URL}/pokemon/${name}`);
}
