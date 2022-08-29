import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'

import { Layout } from '../../componets/layout/Layout';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { Entry, EntryStatus } from '../../interfaces';
import DeleteIcon from '@mui/icons-material/Delete';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { useRouter } from 'next/router';
import { datefunction } from '../../utils';


const validSatus: EntryStatus[] =['pending','in-progress','finished']

interface Props{
    entry: Entry
}
export const EntryPage: FC<Props> = ({entry}) => {
     const router = useRouter()
    const {onUpdateEntry, deleteEntry} = useContext( EntriesContext )
    const [inputValue, setInputValue] = useState(entry.description);

    const [status, setStatus] = useState<EntryStatus>(entry.status);

    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => 
        inputValue.length <= 0 && touched
    ,[inputValue,touched])

    const onTextFieldChanges =(event: ChangeEvent<HTMLInputElement> )=>{
        setInputValue( event.target.value)
    }

    const onStatusChanges = (event: ChangeEvent<HTMLInputElement> )=>{
        setStatus(event.target.value as EntryStatus )
    }

    const onSaved = () =>{
        if( inputValue.trim().length ===0 ) return;
            
            const updateEntry : Entry={
                ...entry,
                status,
                description:inputValue
            }
            onUpdateEntry(updateEntry, true)
    }
    const onClickDelete = ()=>{
        deleteEntry(entry, true)
        router.push('/')
    }
    return(
        <Layout title={ inputValue.substring (0,20)+'...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={ 12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={'Creada hace'+ datefunction.getFormatDinstanceToNow(entry.createdAt)  }
                        />
                        <CardContent>
                            <TextField 
                                sx={{ marginTop:2, marginBottom :1 }}
                                fullWidth
                                placeholder='Nueva Entrada'
                                autoFocus
                                multiline
                                label='Nueva entrada'
                                value={ inputValue }
                                onChange={ onTextFieldChanges }
                                helperText={ isNotValid && 'Ingrese un valor' }
                                onBlur={ () =>setTouched(true)}
                                error={ isNotValid }
                            />
                            <FormControl>
                                <FormLabel>Estado: </FormLabel>
                                <RadioGroup 
                                    row
                                    value={status}
                                    onChange={ onStatusChanges }
                                >
                                    {
                                        validSatus.map(option  => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />} 
                                                label={capitalize(option) }
                                            />

                                            
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveIcon />}
                                variant='contained'
                                fullWidth
                                onClick={ onSaved }
                                disabled={ inputValue.length <= 0 }
                            >
                                Guardar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton
                sx={{ 
                    position:'fixed',
                    bottom:30,
                    right:30,
                    backgroundColor:'error.dark'
                }}
                onClick={ onClickDelete }
            >
                <DeleteIcon 
                />
            </IconButton>
        </Layout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    
    const { id } = params as {id: string }
    
     const entry = await dbEntries.getEntryByid(id)

    if( !entry ){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }
    return {
        props: {
            entry:entry
        }
    }
}


export default EntryPage

