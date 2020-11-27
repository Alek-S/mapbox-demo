/* eslint-disable no-shadow */
export interface IReducerAction {
	type: 'SET_MAP_TYPE';
	payload: 'default' | 'satellite';
}

export enum ActionType {
	SET_MAP_TYPE = 'SET_MAP_TYPE',
}

export const mapLayerReducer = (state, action: IReducerAction) => {
	switch (action.type) {
		case ActionType.SET_MAP_TYPE:
			console.log(ActionType.SET_MAP_TYPE, action.payload);
			return {
				...state,
				mapLayer: action.payload,
			};

		default:
			return state;
	}
};
