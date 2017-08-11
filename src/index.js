import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import styles from './components/app.css';


const App = () => (
    <div>
        <Header />
        <Main>
            <Home />
        </Main>
        <Footer />
    </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
