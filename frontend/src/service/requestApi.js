import axios from 'axios'; // API that makes HTTP requests

const baseURL = '/data';
const requestApi = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { requestApi };
