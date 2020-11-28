import { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';

import { StateContext } from '@store/Context';
import { ActionType } from '@store/reducer';

const PinDialog: FunctionComponent = () => {
	const { state, dispatch } = useContext(StateContext);

	return (
		<StyledPinDialog>
			<StyledHeader>Current Pins</StyledHeader>
			<PinSection>
				{state.markers.map((marker, index) => (
					<PinInfo key={`${marker.lat}-${marker.lng}`}>
						<h4>Pin {index + 1}</h4>
						<p>
							<span className="emphasis">Latitude:</span>
							{marker.lat.toFixed(4)}
						</p>
						<p>
							<span className="emphasis">Longtude:</span>
							{marker.lng.toFixed(4)}
						</p>
					</PinInfo>
				))}
			</PinSection>
		</StyledPinDialog>
	);
};

const StyledPinDialog = styled.div`
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
	left: 1rem;
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

const PinSection = styled.div`
	max-height: 90vh;
	overflow: scroll;
`;

const PinInfo = styled.div`
	border-bottom: 1px solid #e9e9e9;
	padding: 1rem;

	h4 {
		margin: 0;
		padding: 0;
		font-size: 1rem;
	}

	p {
		margin: 0;
		padding: 0;
		font-size: 0.75rem;
	}

	.emphasis {
		font-weight: 600;
		margin-right: 0.5rem;
	}
`;

export default PinDialog;
