import { useContext, FunctionComponent } from 'react';
import { Marker } from 'react-map-gl';

import { StateContext } from '@store/Context';
import { ActionType } from '@store/reducer';

import Pin, { IWeather } from '@components/Pin/Pin';

/** Individual Marker UI component on the map */
const MapMarker: FunctionComponent<Props> = (props: Props) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { dispatch } = useContext(StateContext);

	const onMarkerDragEnd = (event: MarkerEvent) => {
		dispatch({
			type: ActionType.MODIFY_MARKER,
			markerData: {
				lng: event.lngLat[0],
				lat: event.lngLat[1],
			},
			markerIndex: props.markerIndex,
		});
	};

	const removeMarker = () => {
		props.setPaused(true);
		dispatch({
			type: ActionType.REMOVE_MARKER,
			markerIndex: props.markerIndex,
		});

		// debounce until another add can be triggered
		// eslint-disable-next-line no-undef
		setTimeout(() => {
			props.setPaused(false);
		}, 500);
	};

	const addMarkerWeather = (weather: IWeather) => {
		dispatch({
			type: ActionType.ADD_MARKER_WEATHER,
			markerIndex: props.markerIndex,
			markerWeather: weather,
		});
	};

	return (
		<Marker
			longitude={props.lng}
			latitude={props.lat}
			offsetTop={-10}
			offsetLeft={-5}
			onDragEnd={onMarkerDragEnd}
			draggable
		>
			<Pin
				size={20}
				longitude={props.lng}
				latitude={props.lat}
				onClose={removeMarker}
				addMarkerWeather={addMarkerWeather}
			/>
		</Marker>
	);
};

interface Props {
	markerIndex: number;
	lat: number;
	lng: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setPaused: any;
}

interface MarkerEvent {
	lngLat: number[];
}

export default MapMarker;
