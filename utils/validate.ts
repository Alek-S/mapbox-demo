export const validateLat = (value: number): boolean => {
	let isValid = false;
	value = Number(value);

	if (value > -90 && value <= 90) {
		isValid = true;
	}
	return isValid;
};

export const validateLng = (value: number): boolean => {
	let isValid = false;
	value = Number(value);

	if (value >= -180 && value <= 180) {
		isValid = true;
	}
	return isValid;
};
