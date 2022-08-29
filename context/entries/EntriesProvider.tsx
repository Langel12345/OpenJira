import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext,entriesReducer } from './';
import { useSnackbar } from 'notistack';


export interface EntriesState {
    entries : Entry[];
}

const Entries_INITIAL_STATE : EntriesState = {
    entries : [],
}

export const EntiresProvider :FC<PropsWithChildren> = ( { children }) => {

const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE )
const { enqueueSnackbar } = useSnackbar();

useEffect(() => {
    refreshEntries();
}, [])


const addNewEntry = async ( description: string) =>{
    /* const NewEntry : Entry={
        _id: uuidv4(),
        description,
        createdAt: Date.now(),
        status: 'pending'
    } */
    const {data} = await entriesApi.post<Entry>('/entries',{description})
    dispatch({ type:'[Entrie] Add-Entry', payload: data })
} 

const onUpdateEntry = async( {_id, description, status} : Entry, showSnackbar =false) =>{

    try {
        const {data} = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status} )
        dispatch( { type:'[Entrie] Updated-Entry',payload: data })
        if( showSnackbar ){
            enqueueSnackbar(
                'Entrada Actualizada',{
                variant:'success',
                autoHideDuration:1500,
                    anchorOrigin:{
                        vertical:'top',
                        horizontal:'right'
                    }
                }
            )
        }
        
    } catch (error) {
        console.error(error)
    }
}

const deleteEntry =async ({_id } : Entry, showSnackbar =false) =>{
    try {
        const {data} = await entriesApi.delete<Entry>(`/entries/${_id}`)
        dispatch( { type:'[Entry] Delete Entry' ,payload: data })
        if( showSnackbar ){
            enqueueSnackbar(
                'Entrada Eliminada',{
                variant:'success',
                autoHideDuration:1500,
                    anchorOrigin:{
                        vertical:'top',
                        horizontal:'right'
                    }
                }
            )
        }
        
    } catch (error) {
        console.error(error)
    }
}

const refreshEntries = async () =>{
    const {data} = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type:'[Entry] Refres Data', payload: data })
}

    return (
        <EntriesContext.Provider value={{ 
            ...state,
            // MEtodos
            addNewEntry,
            onUpdateEntry,
            deleteEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}