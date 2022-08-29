import { Entry } from '../../interfaces';
import {  EntriesState } from './';


type  EntriesActionType =
| { type: '[Entrie] Add-Entry', payload: Entry }
| { type: '[Entrie] Updated-Entry', payload: Entry }
| { type: '[Entry] Refres Data', payload : Entry}
| { type: '[Entry] Delete Entry', payload :Entry}
export const  entriesReducer = ( state:  EntriesState, action :  EntriesActionType ) :  EntriesState =>{

    switch (action.type) {
        case '[Entrie] Add-Entry':
        return{
            ...state,
            entries:[...state.entries, action.payload ]
        }
        case '[Entrie] Updated-Entry':
            return {
                ...state,
                entries: state.entries.map( entry =>{
                    if( entry._id === action.payload._id){
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry
                })
            }
        case '[Entry] Refres Data':
            return {
                ...state,
                entries: [...action.payload]
            }
        default:
        case '[Entry] Delete Entry':
            return {
                ...state,
                entries : state.entries.filter( e => e._id !== action.payload._id)
            }
        return state;
    }
}