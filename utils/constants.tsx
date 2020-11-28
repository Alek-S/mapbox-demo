import map from './map.json';
import { hideMapLabels } from '@utils/hideLabels';

/** Token for accessing mapbox api */
export const MAPBOX_TOKEN =
	'pk.eyJ1IjoiYWxlay1zIiwiYSI6ImNqamVvd2t1dzFkcG8zcW9sdTA4dzRhcHQifQ.fLXqRUcg4KMyrP-gOQPB8Q';

/** Mapbox Satellite raster image map style */
export const MAP_STYLE_SATELLITE = 'mapbox://styles/mapbox/satellite-v9';

/** Mapbox light gray vector map style with labels removed */
export const MAP_STYLE_LIGHT = hideMapLabels(map);

/** SVG Icon used when adding marker */
export const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
	C20.1,15.8,20.2,15.8,20.2,15.7z`;

export const WEATHER_API = '6fb05c0c696e20c48b182d507b3c0e36';
