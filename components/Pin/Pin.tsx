import { ICON } from '@utils/constants';

const pinStyle = {
	fill: '#e7345e',
	stroke: 'none',
};

const Pin = (props: Props) => {
	const { size = 20 } = props;

	return (
		<svg height={size} viewBox="0 0 24 24" style={pinStyle}>
			<path d={ICON} />
		</svg>
	);
};

interface Props {
	size: number;
}

export default Pin;
