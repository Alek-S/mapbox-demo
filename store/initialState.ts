/* eslint-disable no-shadow */
export enum MapLayer {
	default = 'default',
	satellite = 'satellite',
}

const initialState = {
	mapLayer: MapLayer.default,
};

export default initialState;
