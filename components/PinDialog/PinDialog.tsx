import { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';

import { StateContext } from '@store/Context';
import { ActionType } from '@store/reducer';

const PinDialog: FunctionComponent<Props> = (props: Props) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { state, dispatch } = useContext(StateContext);

	const removePin = (markerIndex: number) => {
		dispatch({
			type: ActionType.REMOVE_MARKER,
			markerIndex,
		});
	};

	return (
		<StyledPinDialog>
			<StyledHeader>Current Pins</StyledHeader>
			<PinSection>
				{state.markers.map((marker, index) => (
					<PinInfo key={`${marker.lat}-${marker.lng}`}>
						<h4>Pin {index + 1}</h4>
						<button
							className="material-icons"
							onClick={() => props.updateViewPort(index)}
						>
							my_location
						</button>
						<CloseButton type="button" onClick={() => removePin(index)}>
							&#10005;
						</CloseButton>
						<p>
							<span className="emphasis">Temp:</span>
							{marker?.temp}
						</p>
						<p>
							<span className="emphasis">Latitude:</span>
							{marker.lat.toFixed(4)}
						</p>
						<p>
							<span className="emphasis">Longitude:</span>
							{marker.lng.toFixed(4)}
						</p>
					</PinInfo>
				))}
			</PinSection>
		</StyledPinDialog>
	);
};

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	updateViewPort: any;
}

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

	.material-icons {
		cursor: pointer;
		font-size: 0.75em;
		position: relative;
		right: -10px;
		top: 1px;
		border: solid 1px black;
		border-radius: 0.35rem;
		background-color: white;
	}
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
		display: inline;
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

const CloseButton = styled.button`
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.primary};
	color: white;
	border: none;
	border-radius: 0.35rem;
	margin-left: 3.5rem;
	margin-bottom: 0.5rem;
	font-size: 0.7rem;
`;

export default PinDialog;
