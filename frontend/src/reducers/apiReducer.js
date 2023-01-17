import { createSlice } from '@reduxjs/toolkit';
import requestApi from '../service/requestApi';

/*  Although the task is simple and does not require Redux for Fetching data, 
and local useState suffices I just felt like this is more robust and 
did not know at the begining the actual complexity :P */
const data = createSlice({
  name: 'data',
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

export const { fetchAll } = data.actions;
export default data.reducer;
