import React from "react";
import {useAuth0} from '@auth0/auth0-react';
import Game from "./components/Game";
import Loading from "./components/loading";
import NavBar from "./components/nav-bar";

const App = () => {
    const {isLoading} = useAuth0();
    if (isLoading) {
        return <Loading/>
    }
    return (
        <div className="App">
            <header className="App-header">
                <NavBar/>
                <Game/>
            </header>
        </div>
    );
}

export default App;
