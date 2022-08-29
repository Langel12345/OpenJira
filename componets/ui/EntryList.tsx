import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { EntryStatus } from '../../interfaces/Entry';
import { DragEvent, FC,useContext, useMemo } from "react";
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from "../../context/ui";
import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus
}
export const EntryList: FC <Props> = ({status}) => {

    const {entries, onUpdateEntry} = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext)
    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status) , [ entries ])
        
    const onDropEntry = (event : DragEvent<HTMLDivElement>) =>{
        event.preventDefault(); 
        const id = event.dataTransfer.getData('text')
        const entry = entries.find( e => e._id === id)!;
        entry.status = status
        onUpdateEntry(entry)
        endDragging()
    } 

    const allowDrop =( event: DragEvent<HTMLDivElement> )=>{
        event.preventDefault();
    }
    return ( 
        // aqui haremos drop
        <div
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            className= { isDragging ? styles.dragging :'' }
        >
            <Paper sx={{ height:'calc(100vh - 180px)', overflow:'scroll', backgroundColor:'transparent' , padding: '1px 5px','&::-webkit-scrollbar': { display: 'none' } }}>
                {/* Cambiara dependiendo si esty haucuendo drag  */}
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition:'all .3s' }}>
                    {
                        entriesByStatus.map(  entry => (
                            <EntryCard  key={entry._id} entry={ entry }/>
                        ))
                    }
                    
                </List>
            </Paper> 
        </div>
    )
}
