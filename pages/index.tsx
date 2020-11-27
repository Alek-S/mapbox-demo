import Head from 'next/head';

import Map from '@components/Map/Map';
import LayerControl from '@components/LayerControl/LayerControl';
import { StateProvider } from '@store/Context';

export default function Home() {
	return (
		<StateProvider>
			<Head>
				<title>Mapbox Demo</title>
				<link rel="icon" href="/favicon.ico" />

				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Rajdhani:300,400,500,600&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
			</Head>

			<main>
				<LayerControl />
				<Map />
			</main>
		</StateProvider>
	);
}
