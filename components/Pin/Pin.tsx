import { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { ICON, WEATHER_API } from '@utils/constants';

const pinStyle = {
	fill: '#e7345e',
	stroke: 'none',
};

/** UI for the map pin displayed by mapbox marker */
const Pin: FunctionComponent<Props> = (props: Props) => {
	const [weather, setWeather] = useState<IWeather>();
	const { size = 20 } = props;

	useEffect(() => {
		// eslint-disable-next-line prettier/prettier
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${props.latitude}&lon=${props.longitude}&appid=${WEATHER_API}`;

		axios.get(url).then(({ data }) => {
			setWeather({
				humidity: data?.main?.humidity,
				temp: data?.main?.temp,
				feelsLike: data?.main?.feels_like,
				description: data?.weather[0].description,
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
}

interface IWeather {
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

export default Pin;
