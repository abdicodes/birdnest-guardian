import { useState, useEffect } from 'react';
import Cards from './Cards';
import schedule from 'node-schedule';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApi } from './reducers/apiReducer';
import Radar from './Radar';
function App() {
  const [showRadar, setShowRadar] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    schedule.scheduleJob('*/2 * * * * *', () => {
      dispatch(fetchApi());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pilots = useSelector((state) => state.reducer.pilots);
  const drones = useSelector((state) => state.reducer.drones);
  const closestDist = useSelector((state) => state.reducer.minRecordedDistance);
  const radarToggle = (e) => {
    if (e.target.innerText === 'DISPLAY RADAR') {
      e.target.innerText = 'HIDE RADAR';
    } else {
      e.target.innerText = 'DISPLAY RADAR';
    }
    setShowRadar(!showRadar);
  };
  if (!pilots) return null;
  return (
    <Box sx={{ flexGrow: 1 }} style={{ background: 'Azure' }}>
      <Grid container spacing={0} sx={{ padding: '20px' }}>
        {closestDist.distance && (
          <Typography variant="h4">
            {' '}
            Closest confirmed distance is:{' '}
            {Math.round(closestDist.distance / 1000)} meters
          </Typography>
        )}
        {showRadar && <Radar drones={drones} />}
      </Grid>
      <Grid container spacing={0} sx={{ padding: '30px' }}>
        {' '}
        <Button variant="contained" onClick={radarToggle}>
          Display radar
        </Button>
      </Grid>
      <Grid
        container
        spacing={3}
        style={{ background: 'LightBlue', padding: '50px' }}
      >
        {pilots.map((pilot) => (
          <Cards key={pilot.pilotId} pilot={pilot} />
        ))}
      </Grid>
    </Box>
  );
}

export default App;
