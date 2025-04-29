
import { RootState } from '../store';

export const selectUnit = (state: RootState): 'celsius' | 'fahrenheit' => state.temperature.unit;