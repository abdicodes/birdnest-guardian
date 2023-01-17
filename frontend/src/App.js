import { useState, useEffect } from 'react';
import Cards from './Cards';
import axios from 'axios';
import schedule from 'node-schedule';
import { Grid, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApi } from './reducers/apiReducer';
function App() {
  // const [pilotList, setPilotList] = useState([]);
  // const [drones, setDrones] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    schedule.scheduleJob('*/5 * * * * *', () => {
      //   axios.get('http://localhost:3001').then((response) => {
      //     setPilotList(response.data.pilots);
      //     setDrones(response.data.drones);
      //     // console.log([...response.data]);
      //   });
      dispatch(fetchApi());
    });
  }, []);
  const pilots = useSelector((state) => state.reducer.pilots);

  // console.log(pilotList[0].firstName);

  // if (pilotList.length > 0)
  if (!pilots) return null;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}></Grid>
      <Grid container spacing={2} sx={{ flexGrow: 3 }}>
        {pilots.map((pilot, i) => (
          <Grid item xs={4} key={i}>
            {' '}
            <Cards pilot={pilot} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
