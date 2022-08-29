import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
    | { message: string }
    | IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    const  { id } = req.query;
    if ( !mongoose.isValidObjectId(id)){
        return res.status(400).json({ message :' El id no es valido '+ id })
    }
    switch (req.method) {
        case 'PUT':
            return  updateEntry( req , res);
        case 'GET':
            return getEntry( req, res)
        case 'DELETE':
            return deleteEntry(req, res)
        default:
            res.status(400).json({ message: 'Metodo no existe' });
    }

}
const updateEntry =async ( req: NextApiRequest, res: NextApiResponse<Data>) =>{
    const  { id } = req.query;
    await db.connect()

    const entryToUpdate = await Entry.findById(id)

    if( !entryToUpdate){
        await db.disconnect()
        return  res.status(400).json({ message :' No hay una entrada con ese ID' + id})
    }


    const {
        description = entryToUpdate.description,
        status= entryToUpdate.status
    } = req.body

    try {
        const updatedEntry = await Entry.findByIdAndUpdate( id , { description,status }, { runValidators:true, new:true })
        await db.disconnect()
        res.status(200).json(updatedEntry! );
    } catch (error:any) {
        console.error(error)
        await db.disconnect()
        res.status(400).json({ message: error.errors.status.message } );
    }
    
    
}
const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    const  { id } = req.query;
    
    await db.connect()
    const entryGetById = await Entry.findById(id)
    await db.disconnect()
    if( !entryGetById ){
        return  res.status(400).json({ message :' No hay una entrada con ese ID' + id})
    }

    res.status(200).json(entryGetById)

}
const deleteEntry=async( req:NextApiRequest, res:NextApiResponse<Data>)=>{
    const { id } = req.query
    console.log(req)
    await db.connect()
    const entryDeleteById = await Entry.findByIdAndDelete(id)
    await db.disconnect()
    if( !entryDeleteById ){
        return  res.status(400).json({ message :' No hay una entrada con ese ID' + id})
    }

    res.status(200).json(entryDeleteById)
}