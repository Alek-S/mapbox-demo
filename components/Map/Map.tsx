import { useState, useContext, FunctionComponent } from 'react';
import styled from 'styled-components';
import ReactMapGL, { Layer, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
	MAPBOX_TOKEN,
	MAP_STYLE_SATELLITE,
	MAP_STYLE_LIGHT,
} from '@utils/constants';
import Pin from '@components/Pin/Pin';
import { modelLayer } from '@components/Map/modelLayer';
import { buildingLayer } from '@components/Map/extrudeBuildingLayer';
import MapMarker from '@components/MapMarker/MapMarker';

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
	});
	const [marker, setMarker] = useState({
		latitude: 41.89237617397896,
		longitude: -87.63408038583424,
	});

	const getMapStyle = () => {
		return state.mapLayer === MapLayer.default
			? MAP_STYLE_LIGHT
			: MAP_STYLE_SATELLITE;
	};

	const addNewMarker = event => {
		console.log('mouse click', event.lngLat);

		dispatch({
			type: ActionType.ADD_MARKER,
			markerData: {
				lng: event.lngLat[0],
				lat: event.lngLat[1],
			},
		});
		console.log({ state });
	};

	const onMarkerDragEnd = event => {
		console.log('onMarkerDragEnd', event.lngLat[0], event.lngLat[1]);
		setMarker({
			longitude: event.lngLat[0],
			latitude: event.lngLat[1],
		});
	};

	return (
		<StyledMap>
			<ReactMapGL
				onClick={addNewMarker}
				{...viewport}
				mapStyle={getMapStyle()}
				onViewportChange={nextViewport =>
					setViewport({ ...nextViewport, width: '100%', height: '100%' })
				}
				mapboxApiAccessToken={MAPBOX_TOKEN}
			>
				{/* <Marker
					longitude={marker.longitude}
					latitude={marker.latitude}
					offsetTop={-20}
					offsetLeft={-10}
					draggable
					onDragEnd={onMarkerDragEnd}
				>
					<Pin size={20} />
				</Marker> */}
				{/* {state.markers.map(marker => (
					<Marker
						key={`${marker.lat}-${marker.lng}`}
						longitude={marker.lng}
						latitude={marker.lat}
						offsetTop={-20}
						offsetLeft={-10}
						draggable={false}
					>
						<Pin size={20} />
					</Marker>
				))} */}
				{state.markers.map((marker, index) => (
					<MapMarker
						key={`${marker.lat}-${marker.lng}`}
						lng={marker.lng}
						lat={marker.lat}
						markerIndex={index}
					>
						<Pin size={20} />
					</MapMarker>
				))}
				{/* <Layer {...buildingLayer} /> */}
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
