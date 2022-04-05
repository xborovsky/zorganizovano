import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import TipDetailContainer from './tip-detail/TipDetailContainer';
import TipsList from './tips-list/TipsList';

const Tips = () => {

    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <TipDetailContainer />
            </Route>
            <Route path={match.path}>
                <TipsList />
            </Route>
        </Switch>
    );
};

export default Tips;