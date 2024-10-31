'use client'

import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

type CardpokemonProps = {
    name: string
    photo: string
}

export function CardPokemon({name, photo} : CardpokemonProps) {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={photo}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography 
                        textAlign='center' 
                        gutterBottom 
                        variant="h5" 
                        component="div"
                        textTransform='capitalize'
                    >
                    {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

