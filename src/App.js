import React, { useState } from 'react'
import {
	Button,
	createMuiTheme,
	CssBaseline,
	makeStyles,
	ThemeProvider,
	Typography,
	useMediaQuery,
} from '@material-ui/core'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import logo from './logo.svg'
import store from './store'
import { useStyles } from './theme'
import { getMode, setMode } from './actions/darkModeActions'
import CustomAppBar from './components/appBar'
import StoreLandingPage from './components/storeLandingPage'

function App() {
	const [darkMode, setDarkMode] = useState(getMode())

	const classes = useStyles()

	const localClasses = useLocalStyles()

	const toggleDarkMode = () => {
		setDarkMode(!darkMode)
		setMode(!darkMode)
	}

	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: darkMode ? 'dark' : 'light',
				},
			}),
		[darkMode]
	)

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<Switch>
						<Route exact path='/'>
							<StoreLandingPage/>
						</Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</Provider>
	)
}

const useLocalStyles = makeStyles(theme => ({
	appHeader: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		fontSize: 'calc(10px + 2vmin)',
		justifyContent: 'center',
		minHeight: '100vh',
	},
	appLink: {
		color: '#61dafb',
	},
	appLogo: {
		height: '40vmin',
		pointerEvents: 'none',
	},
	appLogoAnim: {
		animation: 'App-logo-spin infinite 20s linear',
	},
	button: {
		margin: theme.spacing(2),
	},
	devLink: {
		color: 'inherit',
	},
}))

export default App
