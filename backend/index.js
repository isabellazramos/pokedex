const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

app.get('/pokemons/', async (req,res) => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const mappedResponse = response.data.results.map(dadosPokemon =>{
        return {
            name: dadosPokemon.name,
            id: dadosPokemon.url.slice(34).replace('/','')
        }
    });
    res.send(mappedResponse);
});

app.get('/pokemons/:id', async (req, res) => {
    try
    {
      const pokemon = await obterDetalhesPokemon(req.params.id);
      res.send(pokemon);
    }
    catch(e)
    {
      console.error(e);
    }
})

async function obterDetalhesPokemon(id) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = {
        id: response.data.id,
        name: response.data.name,
        types: response.data.types.map(type => type.type.name),
        abilities: response.data.abilities.map(ability => ability.ability.name),
        stat: response.data.stats.map(stat => {
        return { name: stat.stat.name, value: stat.base_stat };
        })
    };
    return pokemon;
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  })
  