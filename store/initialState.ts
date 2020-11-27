/* eslint-disable no-shadow */
export enum MapLayer {
	default = 'default',
	satellite = 'satellite',
}

export interface IState {
	mapLayer: MapLayer;
	isModelVisible: boolean;
}

const initialState: IState = {
	mapLayer: MapLayer.default,
	isModelVisible: true,
};

export default initialState;
