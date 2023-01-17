import { createSlice } from '@reduxjs/toolkit';
import requestApi from '../service/requestApi';
import schedule from 'node-schedule';

/*  Although the task is simple and does not require Redux for Fetching data, 
and local useState suffices I just felt like this is more robust and 
did not know at the begining the actual complexity :P */
const pilots = createSlice({
  name: 'pilots',
  initialState: [],
  reducers: {
    fetchAll(state, action) {
      return action.payload;
    },
  },
});

export const fetchApi = () => {
  return async (dispatch) => {
    const response = await requestApi.requestApi();

    dispatch(fetchAll(response));
  };
};

export const { fetchAll } = pilots.actions;
export default pilots.reducer;
