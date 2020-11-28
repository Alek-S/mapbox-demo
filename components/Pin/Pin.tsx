import { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { ICON, WEATHER_API } from '@utils/constants';

const pinStyle = {
	fill: '#e7345e',
	stroke: 'none',
};

const kelvinToFahrenheit = (k: number): number => {
	return k && Number(((k - 273.15) * (9 / 5) + 32).toFixed(1));
};

/** UI for the map pin displayed by mapbox marker */
const Pin: FunctionComponent<Props> = (props: Props) => {
	const [weather, setWeather] = useState<IWeather>();
	const { size } = props;

	useEffect(() => {
		// eslint-disable-next-line prettier/prettier
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${props.latitude}&lon=${props.longitude}&appid=${WEATHER_API}`;

		axios.get(url).then(({ data }) => {
			setWeather({
				humidity: data?.main?.humidity,
				temp: kelvinToFahrenheit(data?.main?.temp),
				feelsLike: kelvinToFahrenheit(data?.main?.feels_like),
				description: data?.weather[0]?.description,
				wind: data?.wind?.speed,
			});

			props.addMarkerWeather({
				humidity: data?.main?.humidity,
				temp: kelvinToFahrenheit(data?.main?.temp),
				feelsLike: kelvinToFahrenheit(data?.main?.feels_like),
				description: data?.weather[0]?.description,
				wind: data?.wind?.speed,
			});
		});
	}, []);

	return (
		<div>
			<svg height={size} viewBox="0 0 24 24" style={pinStyle}>
				<path d={ICON} />
			</svg>
			<StyledWeather>
				<CloseContainer>
					<CloseButton type="button" onClick={props.onClose}>
						&#10005;
					</CloseButton>
				</CloseContainer>
				<p>
					<span className="emphasis">Conditions:</span> {weather?.description}
				</p>
				<p>
					<span className="emphasis">Wind:</span> {weather?.wind}
				</p>
				<p>
					<span className="emphasis">Temp:</span> {weather?.temp}
				</p>
				<p>
					<span className="emphasis">Feels Like:</span> {weather?.feelsLike}
				</p>
				<p>
					<span className="emphasis">latitude:</span>
					{props.latitude.toFixed(4)}
				</p>
				<p>
					<span className="emphasis">latitude:</span>
					{props.longitude.toFixed(4)}
				</p>
			</StyledWeather>
		</div>
	);
};

interface Props {
	size: number;
	longitude: number;
	latitude: number;
	onClose: unknown;
	addMarkerWeather: any;
}

export interface IWeather {
	humidity: number;
	temp: number;
	description: string;
	wind: number;
	feelsLike: number;
}

const StyledWeather = styled.div`
	position: relative;
	top: -0.25rem;
	right: -0.6rem;
	background-color: rgba(255, 255, 255, 0.92);
	font-size: 1rem;
	z-index: 10;
	border-radius: 0 0.6rem 0.6rem 0.6rem;
	box-shadow: ${({ theme }) => theme.shadows.primary};
	padding: 0.5rem;
	letter-spacing: 0.05rem;

	p {
		font-size: 0.75rem;
		margin: 0.1rem;
		font-weight: 500;
	}
	.emphasis {
		font-weight: 600;
	}
`;

const CloseButton = styled.button`
	cursor: pointer;
	background-color: ${({ theme }) => theme.colors.primary};
	color: white;
	border: none;
	border-radius: 0.35rem;
	padding-left: 0.25rem;
	padding-right: 0.25rem;
	font-size: 0.7rem;
`;

const CloseContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-bottom: 0.5rem;
`;

export default Pin;
