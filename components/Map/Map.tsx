/* eslint-disable no-undef */
import { useState, useContext, FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import ReactMapGL, { Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
	MAPBOX_TOKEN,
	MAP_STYLE_SATELLITE,
	MAP_STYLE_LIGHT,
} from '@utils/constants';
import { StateContext } from '@store/Context';
import { MapLayer } from '@store/initialState';

import { modelLayer } from '@components/Map/modelLayer';

const buildingLayer = {
	id: '3d-buildings',
	source: 'composite',
	'source-layer': 'building',
	filter: ['==', 'extrude', 'true'],
	type: 'fill-extrusion',
	minzoom: 15,
	paint: {
		'fill-extrusion-color': '#aaa',

		// use an 'interpolate' expression to add a smooth transition effect to the
		// buildings as the user zooms in
		'fill-extrusion-height': [
			'interpolate',
			['linear'],
			['zoom'],
			15,
			0,
			15.05,
			['get', 'height'],
		],
		'fill-extrusion-base': [
			'interpolate',
			['linear'],
			['zoom'],
			15,
			0,
			15.05,
			['get', 'min_height'],
		],
		'fill-extrusion-opacity': 0.6,
	},
};

/** Full bleed Mapbox Component */
const Map: FunctionComponent = () => {
	const { state } = useContext(StateContext);
	const [viewport, setViewport] = useState({
		width: '100%',
		height: '100%',
		latitude: 41.8922591,
		longitude: -87.6352603,
		zoom: 15.5,
		pitch: 50,
		antialias: true,
	});

	const getMapStyle = () => {
		return state.mapLayer === MapLayer.default
			? MAP_STYLE_LIGHT
			: MAP_STYLE_SATELLITE;
	};

	return (
		<StyledMap>
			<ReactMapGL
				{...viewport}
				mapStyle={getMapStyle()}
				onViewportChange={nextViewport =>
					setViewport({ ...nextViewport, width: '100%', height: '100%' })
				}
				mapboxApiAccessToken={MAPBOX_TOKEN}
			>
				<Layer {...buildingLayer} />
				{state.isModelVisible && <Layer {...modelLayer} />}
			</ReactMapGL>
		</StyledMap>
	);
};

const StyledMap = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 0;
`;

export default Map;
