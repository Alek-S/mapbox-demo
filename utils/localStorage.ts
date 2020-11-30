/* eslint-disable no-undef */
import { MarkerData } from '@store/initialState';

/** Add all markers to local storage */
export const storeMarkers = (markers: MarkerData[]): void => {
	localStorage.setItem('markers', JSON.stringify(markers));
};

/** Read all saved markers from local storage */
export const getStoredMarkers = (): MarkerData[] => {
	const stored = JSON.parse(localStorage.getItem('markers'));
	return stored ? stored : [];
};

/** Remove local storage entry */
export const clearStoredMarkers = (): void => {
	localStorage.removeItem('markers');
};
