import { FunctionComponent, useContext, useState } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';

import { StateContext } from '@store/Context';
import { ActionType } from '@store/reducer';
import { MapLayer } from '@store/initialState';

const LayerControl: FunctionComponent = () => {
	const [isModelVisible, setModelVisible] = useState<boolean>(true);
	const { state, dispatch } = useContext(StateContext);

	const handleLayerChange = event => {
		dispatch({
			type: ActionType.SET_MAP_TYPE,
			mapLayer: MapLayer[event.target.value],
		});
	};

	const toggleModel = event => {
		setModelVisible(event.target.checked);
		dispatch({
			type: ActionType.TOGGLE_MODEL,
			isModelVisible: event.target.checked,
		});
	};

	return (
		<StyledControl>
			<StyledHeader>Map Style</StyledHeader>
			<StyledForm
				aria-label="mapStyle"
				name="mapStyle"
				value={state.mapLayer}
				onChange={handleLayerChange}
			>
				<FormControlLabel
					value={MapLayer.default}
					control={<Radio />}
					label="Default"
				/>
				<FormControlLabel
					value={MapLayer.satellite}
					control={<Radio />}
					label="Satellite"
				/>
			</StyledForm>
			<Divider />
			<StyledHeader>3D Model</StyledHeader>
			<FormGroup style={{ marginLeft: '1rem' }}>
				<FormControlLabel
					control={
						<Switch
							checked={isModelVisible}
							onChange={toggleModel}
							name="isModelVisible"
							color="secondary"
						/>
					}
					label="Visible"
				/>
			</FormGroup>
		</StyledControl>
	);
};

const StyledControl = styled.div`
	position: fixed;
	width: fit-content;
	font-size: 1rem;
	z-index: 10;
	background-color: rgba(255, 255, 255, 0.92);
	border-radius: 0.5rem;
	box-shadow: ${({ theme }) => theme.shadows.primary};
	overflow: hidden;
	padding: 0;
	top: 1rem;
	right: 1rem;
	font-weight: 500;
`;

const StyledHeader = styled.h2`
	font-size: 1.1rem;
	font-weight: 500;
	letter-spacing: 1px;
	background: ${({ theme }) => theme.gradients.primary};
	padding: 0.5rem;
	margin: 0;
`;

const StyledForm = styled(RadioGroup)`
	margin-left: 1rem;
	font-family: 'Rajdhani', sans-serif;
`;

const Divider = styled.div`
	margin-top: 1.5rem;
	border-bottom: 1px solid #e9e9e9;
	width: 100%;
`;

export default LayerControl;
