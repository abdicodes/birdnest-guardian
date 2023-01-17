import axios from 'axios'; // API that makes HTTP requests

const baseURL = 'http://localhost:3001';
const requestApi = async () => {
  const response = await axios.get(baseURL);
  console.log(response.data);
  return response.data; // array that contains all breweries details.
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { requestApi };
