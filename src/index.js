import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import Home from './components/Home/Home';
import ExploreWithRouter from './components/Explore/Explore';
import styles from './components/app.css';


const App = () => (
    <Router>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/explore' component={ExploreWithRouter} />
        </Switch>
    </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
