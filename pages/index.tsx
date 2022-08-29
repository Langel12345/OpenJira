
import type { NextPage } from 'next'
import { Layout } from '../componets/layout'

import { Card, CardContent, CardHeader, Grid, } from '@mui/material'
import { EntryList, NewEntry } from '../componets/ui'
const HomePage: NextPage = () => {

  return (
    <Layout title='Open Jira'>
      <Grid container spacing={ 2 }>

        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height:'calc(100vh - 100px)' } }>
              <CardHeader title='Pendientes'> </CardHeader>
                <NewEntry />
                <EntryList status='pending' />
          </Card>
        </Grid>


        <Grid item xs={ 12 } sm={ 4 }>
          <Card sx={{ height:'calc(100vh - 100px)' } }>
              <CardHeader title='En Progreso'> </CardHeader>
              <EntryList status='in-progress' />
          </Card>
        </Grid>


        <Grid item xs={ 12 } sm={ 4 } >
          <Card sx={{ height:'calc(100vh - 100px)' } }>
              <CardHeader title='Completadas'> </CardHeader>
              <EntryList status='finished' />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage
