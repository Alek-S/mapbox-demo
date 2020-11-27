/* eslint-disable react/prop-types */
import { createContext, FunctionComponent, useReducer } from 'react';
import initialState from '@store/initialState';
import { mapLayerReducer } from '@store/reducer';

const StateContext = createContext(initialState);

const StateProvider: FunctionComponent = ({ children }) => {
	const [state, dispatch] = useReducer(mapLayerReducer, initialState);

	return (
		<StateContext.Provider value={{ state, dispatch }}>
			{children}
		</StateContext.Provider>
	);
};
export { StateContext, StateProvider };
