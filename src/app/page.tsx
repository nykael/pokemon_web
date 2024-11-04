'use client'

import { useEffect, useState } from "react";
import { CardPokemon } from "@/components/cardPokemon";
import axios from "axios";
import { 
  Box, 
  Container, 
  Grid2, 
  Skeleton, 
  TextField, 
  Typography 
} from "@mui/material";


type PokemonProps = {
  name: string;
  photo: string;
  id: number;
}

export default function Home() {
  const [pokemon, setPokemon] = useState<PokemonProps []>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [load, setLoad] = useState(true)
  const pokemonFetchLimit = 24
  

  const fetchPokemonList = async () => {
    setLoad(true)
    try {
      const endPoits = Array.from({length: pokemonFetchLimit}, (_, i) => `https://pokeapi.co/api/v2/pokemon/${i + 1}`)
      const resp = await axios.all(endPoits.map((endpoint) => axios.get(endpoint)))

      const pokemonData = resp.map(response => {
        const {data} = response
        return {
          name: data.name,
          photo: data.sprites.front_default,
          id: data.id
        }
      })
      setPokemon(pokemonData)
      
    } catch (error) {
      alert(`opa, não conseguimos carregar sua PokéDex: ${error}`)
    }finally {
    
      setLoad(false)
  }
}
 
  const sendPokemonData = (id: number) => {
    window.ReactNativeWebView?.postMessage(JSON.stringify({id}));
  };

  const filteredByName = searchTerm.length > 0
  ? pokemon.filter(repo => repo.name.includes(searchTerm))
  : pokemon

  useEffect(() => {
    fetchPokemonList()
  },[])


  return (
    <Container maxWidth="lg">
      <Box sx={{m: '20px 0'}}>
        <Typography 
          textAlign='center' 
          variant="h4"
          >PokéDex</Typography>
      </Box>

     <Box sx={{m: '20px 0'}}>
      <TextField 
          fullWidth 
          label="Buscar pelo nome do pokémon" 
          id="fullWidth"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
     </Box>

     <Grid2 container spacing={2}>
     {
      load ? 
        Array.from({length: 10}).map((_,index) => (
          <Grid2 size={{xs: 6, md: 3}} key={index}>
              <Skeleton variant="rectangular" sx={{width: '100%', height: '250px'}}/>
            </Grid2>
        ))
        :

        searchTerm && filteredByName.length === 0 ? 
        ( 
          <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
            <Typography variant="h6">Nenhum Pokémon encontrado para &quot;{searchTerm}&quot;</Typography>
          </Box>
        )  :

        (
          filteredByName.map((item, index) => (
            <Grid2 
              size={{xs: 6, md: 3}} 
              key={index} 
              onClick={() => sendPokemonData(item.id)}
            >
              <CardPokemon
                name={item.name} 
                photo={item.photo}
              />
            </Grid2>
          ))  
        )
           
        }
        </Grid2>
     
    </Container>
  );
}
