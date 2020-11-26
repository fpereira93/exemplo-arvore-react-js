import './App.scoped.sass';
import React from 'react';
import TreeViewList from './components/TreeViewList';
import data from './data.json'

const App = () => {

    const info = (getData) => {
        setTimeout(() => {
            console.log(getData());
            info(getData)
        }, 4000)
    }

    const refer = ({ getData }) => {
        info(getData)
    }

    return (
        <div className="container">
            <TreeViewList data={data} refer={refer} />
        </div>
    );
}

export default App;