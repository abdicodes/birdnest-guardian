import { useState, useEffect } from 'react';
import Cards from './Cards';
import axios from 'axios';
import schedule from 'node-schedule';

function App() {
  const [pilotList, setPilotList] = useState([]);
  useEffect(() => {
    schedule.scheduleJob('*/5 * * * * *', () => {
      axios.get('http://localhost:3001').then((response) => {
        setPilotList(response.data);
        // console.log([...response.data]);
      });
    });
  }, []);
  // console.log(pilotList[0].firstName);

  if (pilotList.length > 0)
    return (
      <div className="App">
        <Cards card={pilotList[0]} />
      </div>
    );
}

export default App;
