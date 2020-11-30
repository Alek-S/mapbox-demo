/* eslint-disable no-undef */
import { IWeather } from '@components/Pin/Pin';
import { IState, MapLayer, MarkerData } from '@store/initialState';
import {
	clearStoredMarkers,
	getStoredMarkers,
	storeMarkers,
} from '@utils/localStorage';

/* eslint-disable no-shadow */
export interface IReducerAction {
	type: ActionType;
	mapLayer: MapLayer;
	isModelVisible: boolean;
	markerData: MarkerData;
	markerIndex: number;
	markerWeather: IWeather;
}

export enum ActionType {
	SET_MAP_TYPE = 'SET_MAP_TYPE',
	TOGGLE_MODEL = 'TOGGLE_MODEL',
	ADD_MARKER = 'ADD_MARKER',
	ADD_MARKER_WEATHER = 'ADD_MARKER_WEATHER',
	MODIFY_MARKER = 'MODIFY_MARKER',
	REMOVE_MARKER = 'REMOVE_MARKER',
	READ_STORED_MARKERS = 'READ_STORED_MARKERS',
	CLEAR_ALL_MARKERS = 'CLEAR_ALL_MARKERS',
}

export const mapLayerReducer = (
	state: IState,
	action: IReducerAction
): IState => {
	switch (action.type) {
		case ActionType.SET_MAP_TYPE:
			return {
				...state,
				mapLayer: action.mapLayer,
			};

		case ActionType.TOGGLE_MODEL:
			return {
				...state,
				isModelVisible: action.isModelVisible,
			};

		case ActionType.ADD_MARKER:
			storeMarkers(state.markers.concat([action.markerData]));
			return {
				...state,
				markers: state.markers.concat([action.markerData]),
			};

		case ActionType.ADD_MARKER_WEATHER:
			const markersWithWeather: MarkerData[] = [...state.markers];
			markersWithWeather[action.markerIndex] = {
				lat: markersWithWeather[action.markerIndex].lat,
				lng: markersWithWeather[action.markerIndex].lng,
				...action.markerWeather,
			};
			storeMarkers(markersWithWeather);
			return {
				...state,
				markers: markersWithWeather,
			};

		case ActionType.MODIFY_MARKER:
			const newMarker: MarkerData[] = [...state.markers];
			newMarker[action.markerIndex] = action.markerData;
			storeMarkers(newMarker);
			return {
				...state,
				markers: newMarker,
			};

		case ActionType.REMOVE_MARKER:
			const updatedMarker: MarkerData[] = [...state.markers];
			updatedMarker.splice(action.markerIndex, 1);
			storeMarkers(updatedMarker);
			return {
				...state,
				markers: updatedMarker,
			};

		case ActionType.READ_STORED_MARKERS:
			return {
				...state,
				markers: getStoredMarkers(),
			};

		case ActionType.CLEAR_ALL_MARKERS:
			clearStoredMarkers();
			return {
				...state,
				markers: [],
			};

		default:
			return state;
	}
};
