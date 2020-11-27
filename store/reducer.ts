import { IState, MapLayer, MarkerData } from '@store/initialState';

/* eslint-disable no-shadow */
export interface IReducerAction {
	type: ActionType;
	mapLayer: MapLayer;
	isModelVisible: boolean;
	markerData: MarkerData;
	markerIndex: number;
}

export enum ActionType {
	SET_MAP_TYPE = 'SET_MAP_TYPE',
	TOGGLE_MODEL = 'TOGGLE_MODEL',
	ADD_MARKER = 'ADD_MARKER',
	MODIFY_MARKER = 'MODIFY_MARKER',
}

export const mapLayerReducer = (
	state: IState,
	action: IReducerAction
): IState => {
	switch (action.type) {
		case ActionType.SET_MAP_TYPE:
			console.table({ action });
			return {
				...state,
				mapLayer: action.mapLayer,
			};

		case ActionType.TOGGLE_MODEL:
			console.table({ action });
			return {
				...state,
				isModelVisible: action.isModelVisible,
			};

		case ActionType.ADD_MARKER:
			console.log({ action });
			return {
				...state,
				markers: state.markers.concat([action.markerData]),
			};

		case ActionType.MODIFY_MARKER:
			console.log({ action });
			const newMarker: MarkerData[] = [...state.markers];
			newMarker[action.markerIndex] = action.markerData;

			return {
				...state,
				markers: newMarker,
			};

		default:
			return state;
	}
};
