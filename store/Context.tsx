/* eslint-disable react/prop-types */
import { createContext, FunctionComponent, useReducer } from 'react';
import initialState from '@store/initialState';
import { mapLayerReducer } from '@store/reducer';

const StateContext = createContext(initialState);

const StateProvider: FunctionComponent = ({ children }) => {
	const [state, dispatch] = useReducer(mapLayerReducer, initialState);

	return (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		<StateContext.Provider value={{ state, dispatch }}>
			{children}
		</StateContext.Provider>
	);
};
export { StateContext, StateProvider };
