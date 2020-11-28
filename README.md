# Mapbox Demo

## Getting Stared

#### Installing Dependencies:
`npm i`

#### Build & Start:
`npm run build-start`

or run them seperately
```
npm run build
npm start
```

#### Run in Dev Mode:
`npm run dev`

---

# Stack
- Next.js
- Typescript
  - Also configured with path aliases, so can import `from '@component'` vs `from '../../component'`
- react-map-gl
- styled-components
- prettier


## File Structure
- 📁 **components** -- Individual React UI components
- 📁 **pages** -- Pages that Next.js routes to, only single `ndex.tsx` page composed of components
- 📁 **public** -- Output for build
- 📁 **store** -- Reducers related to central state
  - central state managed using React's `useReducer` together with `useContext` for reduced boilerplate
- 📁 **style** -- Style and theming files for use by styled-components
- 📁 **utils** -- Contstants and helper files for sharing across the app
