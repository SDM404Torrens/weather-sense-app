
import { createSlice } from '@reduxjs/toolkit';

type TemperatureState = {
  unit: 'celsius' | 'fahrenheit';
};

const initialState: TemperatureState = {
  unit: 'celsius',
};

export const temperatureSlice = createSlice({
  name: 'temperature',
  initialState,
  reducers: {
    toggleUnit: (state) => {
      state.unit = state.unit === 'celsius' ? 'fahrenheit' : 'celsius';
    },
  },
});

export const { toggleUnit } = temperatureSlice.actions;
export default temperatureSlice.reducer;