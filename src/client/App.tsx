import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chirps from './components/Chirps';
import Details from './components/Details';
import './scss/app';



const App: React.FC<IAppProps> = props => {


	return (

		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Chirps} />
				<Route exact path="/:id/admin">
					<Details />
				</Route>
			</Switch>
		</BrowserRouter>

	);
}

export default App;

interface IAppProps { }
