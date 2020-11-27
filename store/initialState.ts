/* eslint-disable no-shadow */
export enum MapLayer {
	default = 'default',
	satellite = 'satellite',
}

export interface IState {
	mapLayer: MapLayer;
}

const initialState: IState = {
	mapLayer: MapLayer.default,
};

export default initialState;
