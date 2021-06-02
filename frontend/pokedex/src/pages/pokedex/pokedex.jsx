import React, {useState, useEffect} from 'react';
import {obterTodosPokemons} from '../repositories/api'
import CardPokemon from '../shared/cardPokemon';
import './pokedex.css';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    listarTodosPokemons();
  }, []);

  const listarTodosPokemons = async () =>
  {
    const pokemons = await obterTodosPokemons();
    setPokemons(pokemons);
  }

    return ( 
      <main className="pokedex-pagina">
        {pokemons.map((pokemon) => (
          <CardPokemon pokemon={pokemon}/>
        ))}
      </main> 
    );
  }
   
  export default Pokedex;