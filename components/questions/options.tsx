import React from 'react'

import {
    Grid,
    FormControl,
    TextField
} from '@material-ui/core'


const Options = ({ optionCount }) => {

    let count = []
    for (let i = 0; i < optionCount; i++) {
        count.push(i)
    }

    return (
        <div>
            <Grid container spacing={2}>
                {count.map(el => <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField label={`option ${el + 1}`} />
                    </FormControl>
                </Grid>)}
            </Grid>
        </div>
    )
}


export default Options