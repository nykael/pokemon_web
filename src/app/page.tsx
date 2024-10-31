'use client'

import { CardPokemon } from "@/components/cardPokemon";
import { Box, Button, Container, Grid2, Skeleton, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type PokemonProps = {
  name: string;
  photo: string;
}

export default function Home() {
  const [filterbyQuantity, setFilterbyQuantity] = useState(21)
  const [pokemon, setPokemon] = useState<PokemonProps []>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [load, setLoad] = useState(false)


  const getByPaginations = async () => {
    setLoad(true)
    try {
      var endPoits = []
      for(var i = 1; i < filterbyQuantity; i++) {
        endPoits.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
      }
      const resp = await axios.all(endPoits.map((endpoint) => axios.get(endpoint)))

      const pokemonData = resp.map(response => {
        const {data} = response
        return {
          name: data.name,
          photo: data.sprites.front_default
        }
      })

      setPokemon(pokemonData)

    } catch (error) {
      console.log('ops, erro ao carregar')
    }finally {
    
      setLoad(false)
  }
}

  useEffect(() => {
    getByPaginations()
  },[])

  const filteredByName = searchTerm.length > 0
  ? pokemon.filter(repo => repo.name.includes(searchTerm))
  : pokemon

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
            <Typography variant="h6">Nenhum Pokémon encontrado para "{searchTerm}"</Typography>
          </Box>
        )  :

        (
          filteredByName.map((item, index) => (
            <Grid2 size={{xs: 6, md: 3}} key={index}>
              <CardPokemon name={item.name} photo={item.photo}/>
            </Grid2>
          ))  
        )
           
        }
        </Grid2>
     
    </Container>
  );
}
