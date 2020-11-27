import GlobalStyles from '@styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';

import theme from '@styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyles />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
