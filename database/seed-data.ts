
interface SeedData {
    entries : SeedEntry[]
}

interface SeedEntry{
    description: string
    status:string
    createdAt : number
}
export const seedData: SeedData= {
    entries: [
        {
            
            description:'Pendindte  :cualquier cosasa',
            status:'pending',
            createdAt :Date.now()
        },
        {
            description:' En progreso : cualquier casasdasdsadsadsadsa',
            status:'in-progress',
            createdAt :Date.now() -10000000
        },
        {
            
            description:' Terminadas : cualquier cosaasd2as5s5s5s5s5s5ssaddsa',
            status:'finished',
            createdAt :Date.now() -100000
        }
    ]
}