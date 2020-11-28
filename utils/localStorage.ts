import { MarkerData } from "@store/initialState";

/** Add all markers to local storage */
export const storeMarkers = (markers: MarkerData[]): void => {
	localStorage.setItem('markers', JSON.stringify(markers));
};

/** Read all saved markers from local storage */
export const getStoredMarkers = (): MarkerData[] => {
	return JSON.parse(localStorage.getItem('markers'));
};
