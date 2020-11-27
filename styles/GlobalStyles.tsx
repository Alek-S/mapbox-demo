import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	body {
			min-height: 100vh;
			background-color: white;
    }

    html, body {
			box-sizing: border-box;
			font-family: 'Rajdhani', sans-serif;
			margin: 0;
			padding: 0;
    }

    main {}
`;

export default GlobalStyles;
