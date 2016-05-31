import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>PluralSight Administration</h1>
                <p>React, Redux amd React Router in ES6 for untra-responsive web apps</p>
                <Link to="/about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
        );
    }
}

export default HomePage;