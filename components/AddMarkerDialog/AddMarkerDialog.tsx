import { FunctionComponent, useState, useContext } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { StateContext } from '@store/Context';
import { ActionType } from '@store/reducer';

const AddMarkerDialog: FunctionComponent = () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { dispatch } = useContext(StateContext);
	const [latitude, setLatitude] = useState<number>();
	const [longitude, setLongitude] = useState<number>();

	const addMarker = () => {
		if (latitude && longitude) {
			dispatch({
				type: ActionType.ADD_MARKER,
				markerData: {
					lng: longitude,
					lat: latitude,
				},
			});
		}
	};

	return (
		<DialogContainer>
			<StyledDialog>
				<StyledHeader>
					Add Marker <br /> (or click map)
				</StyledHeader>
				<TextField
					id="latitude"
					label="Latitude"
					variant="outlined"
					color="secondary"
					type="number"
					size="small"
					value={latitude}
					onChange={({ target }) => setLatitude(Number(target.value))}
					style={{ margin: '1rem' }}
				/>
				<TextField
					id="longitude"
					label="Longitude"
					variant="outlined"
					color="secondary"
					type="number"
					size="small"
					value={longitude}
					onChange={({ target }) => setLongitude(Number(target.value))}
					style={{ margin: '1rem' }}
				/>
				<Button
					variant="contained"
					color="secondary"
					size="small"
					onClick={addMarker}
					style={{ marginBottom: '1.75rem' }}
				>
					Add Marker
				</Button>
			</StyledDialog>
		</DialogContainer>
	);
};

const DialogContainer = styled.div`
	position: fixed;
	bottom: 3rem;
	display: flex;
	justify-content: center;
	width: 100%;
`;

const StyledDialog = styled.div`
	width: fit-content;
	font-size: 1rem;
	z-index: 10;
	background-color: rgba(255, 255, 255, 0.92);
	border-radius: 0.5rem;
	box-shadow: ${({ theme }) => theme.shadows.primary};
	overflow: hidden;
	padding: 0;
	padding-right: 1.5rem;
	font-weight: 500;
`;

const StyledHeader = styled.h2`
	font-size: 1.1rem;
	font-weight: 500;
	letter-spacing: 1px;
	background: ${({ theme }) => theme.gradients.primary};
	padding: 0.5rem;
	border-right: 1px solid #e9e9e9;
	margin: 0;
	margin-right: 1rem;
	padding-top: 1rem;
	padding-left: 1.5rem;
	height: 100%;
	word-wrap: break-word;
	display: inline-block;
	width: 120px;
`;

export default AddMarkerDialog;
