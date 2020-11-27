import { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { StateContext } from '@store/Context';
import { ActionType } from '@store/reducer';
import { MapLayer } from '@store/initialState';

const LayerControl: FunctionComponent = () => {
	const { state, dispatch } = useContext(StateContext);

	const handleChange = event => {
		dispatch({
			type: ActionType.SET_MAP_TYPE,
			payload: MapLayer[event.target.value],
		});
	};

	return (
		<StyledControl>
			<StyledHeader>Toggle Layers</StyledHeader>
			<StyledForm
				aria-label="mapStyle"
				name="mapStyle"
				value={state.mapLayer}
				onChange={handleChange}
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
		</StyledControl>
	);
};

const StyledControl = styled.div`
	position: fixed;
	width: fit-content;
	font-size: 1rem;
	z-index: 10;
	background-color: white;
	border-radius: 0.25rem;
	box-shadow: ${({ theme }) => theme.shadows.primary};
	overflow: hidden;
	padding: 0;
	top: 1rem;
	right: 1rem;
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

export default LayerControl;
