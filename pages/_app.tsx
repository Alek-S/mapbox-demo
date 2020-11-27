import GlobalStyles from '@styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';

import theme from '@styles/theme';

function MyApp({ Component, pageProps }) {
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
