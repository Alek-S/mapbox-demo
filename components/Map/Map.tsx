import { useState, useContext, FunctionComponent } from 'react';
import styled from 'styled-components';
import ReactMapGL, { Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
	MAPBOX_TOKEN,
	MAP_STYLE_SATELLITE,
	MAP_STYLE_LIGHT,
} from '@utils/constants';
import { modelLayer } from '@components/Map/modelLayer';
import { buildingLayer } from '@components/Map/extrudeBuildingLayer';
import MapMarker from '@components/MapMarker/MapMarker';
import PinDialog from '@components/PinDialog/PinDialog';

import { StateContext } from '@store/Context';
import { MapLayer } from '@store/initialState';
import { ActionType } from '@store/reducer';

/** Full bleed Mapbox Component */
const Map: FunctionComponent = () => {
	const { state, dispatch } = useContext(StateContext);
	const [viewport, setViewport] = useState({
		width: '100%',
		height: '100%',
		latitude: 41.8922591,
		longitude: -87.6352603,
		zoom: 15.5,
		pitch: 50,
		antialias: true,
		transitionDuration: null,
	});
	const [isPaused, setPaused] = useState<boolean>(false);

	const getMapStyle = () => {
		return state.mapLayer === MapLayer.default
			? MAP_STYLE_LIGHT
			: MAP_STYLE_SATELLITE;
	};

	const addNewMarker = event => {
		// dispatch only if not currently in debounce
		if (isPaused === false) {
			dispatch({
				type: ActionType.ADD_MARKER,
				markerData: {
					lng: event.lngLat[0],
					lat: event.lngLat[1],
				},
			});
		}
	};

	const updateViewPort = (markerIndex: number) => {
		setViewport({
			width: '100%',
			height: '100%',
			latitude: state.markers[markerIndex].lat,
			longitude: state.markers[markerIndex].lng,
			zoom: 17,
			pitch: 50,
			antialias: true,
			transitionDuration: 500,
		});
	};

	return (
		<StyledMap>
			<PinDialog updateViewPort={updateViewPort} />
			<ReactMapGL
				onClick={addNewMarker}
				{...viewport}
				mapStyle={getMapStyle()}
				onViewportChange={nextViewport =>
					setViewport({ ...nextViewport, width: '100%', height: '100%' })
				}
				mapboxApiAccessToken={MAPBOX_TOKEN}
			>
				{state.markers.map((marker, index) => (
					<MapMarker
						key={`${marker.lat}-${marker.lng}`}
						lng={marker.lng}
						lat={marker.lat}
						markerIndex={index}
						setPaused={setPaused}
					/>
				))}
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
