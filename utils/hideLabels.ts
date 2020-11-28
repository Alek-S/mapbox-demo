export interface IMapStyle {
	version: number;
	name: string;
	metadata: unknown;
	sources: unknown;
	sprite: string;
	glyphs: string;
	layers: ILayer[];
}

export interface ILayer {
	id: string;
	type: string;
	filter?: unknown[];
	paint: unknown;
	interactive: boolean;
}

/** Removes any layer where the layer's id contains the word `label` in it */
function hideMapLabels(mapboxMap) {
	const filteredLayers = mapboxMap.layers.filter(
		layer => !layer.id.includes('label')
	);
	return { ...mapboxMap, layers: filteredLayers };
}

export { hideMapLabels };
