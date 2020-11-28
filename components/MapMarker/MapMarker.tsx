import { useContext, FunctionComponent } from 'react';
import { Marker } from 'react-map-gl';

import { StateContext } from '@store/Context';
import { ActionType } from '@store/reducer';

import Pin from '@components/Pin/Pin';

/** Individual Marker UI component on the map */
const MapMarker: FunctionComponent<Props> = (props: Props) => {
	const { state, dispatch } = useContext(StateContext);

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
		console.log('close ', props.markerIndex);
		dispatch({
			type: ActionType.REMOVE_MARKER,
			markerIndex: props.markerIndex,
		});
		setTimeout(() => {
			props.setPaused(false);
		}, 500);
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
			/>
		</Marker>
	);
};

interface Props {
	markerIndex: number;
	lat: number;
	lng: number;
	setPaused: any;
}

interface MarkerEvent {
	lngLat: number[];
}

export default MapMarker;
