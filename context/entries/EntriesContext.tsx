import { createContext } from 'react';
import { Entry } from '../../interfaces';
interface ContextProps {
    entries: Entry[] // falta el tipo de dato del array

    //METODOS
    addNewEntry: (description: string) => void
    onUpdateEntry: (entry: Entry , showSnackbar: boolean) => void
    deleteEntry :(entry: Entry , showSnackbar: boolean) => void
}

export const EntriesContext  = createContext({} as ContextProps)