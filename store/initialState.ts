import { IWeather } from '@components/Pin/Pin';

/* eslint-disable no-shadow */
export enum MapLayer {
	default = 'default',
	satellite = 'satellite',
}

export interface IState {
	mapLayer: MapLayer;
	isModelVisible: boolean;
	markers: MarkerData[];
}

export interface MarkerData {
	lat: number;
	lng: number;
	weather?: IWeather;
}

const initialState: IState = {
	mapLayer: MapLayer.default,
	isModelVisible: true,
	markers: [],
};

export default initialState;
