import { useState, useEffect } from 'react';
import Cards from './Cards';
import axios from 'axios';
import schedule from 'node-schedule';
import { Grid, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApi } from './reducers/apiReducer';
function App() {
  // const [pilotList, setPilotList] = useState([]);
  // const [drones, setDrones] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    schedule.scheduleJob('*/2 * * * * *', () => {
      //   axios.get('http://localhost:3001').then((response) => {
      //     setPilotList(response.data.pilots);
      //     setDrones(response.data.drones);
      //     // console.log([...response.data]);
      //   });
      dispatch(fetchApi());
    });
  }, []);
  const pilots = useSelector((state) => state.reducer.pilots);
  const closestDist = useSelector((state) => state.reducer.minRecordedDistance);

  // console.log(pilotList[0].firstName);

  // if (pilotList.length > 0)
  if (!pilots) return null;
  return (
    <Box sx={{ flexGrow: 1 }} style={{ background: 'Azure' }}>
      <Grid container spacing={0} sx={{ padding: '100px' }}>
        <Typography variant="h4">
          {' '}
          Closet confirmed distance is: {Math.round(
            closestDist.distance / 100
          )}{' '}
          meters
        </Typography>
      </Grid>
      <Grid
        container
        spacing={3}
        style={{ background: 'LightBlue', padding: '50px' }}
      >
        {pilots.map((pilot) => (
          // <Grid item xs={4} key={pilot.pilotId}>

          <Cards key={pilot.pilotId} pilot={pilot} />
          // </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
