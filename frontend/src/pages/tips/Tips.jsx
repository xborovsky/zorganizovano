import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import TipDetail from './tip-detail/TipDetail';
import TipsList from './tips-list/TipsList';

const Tips = () => {

    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <TipDetail />
            </Route>
            <Route path={match.path}>
                <TipsList />
            </Route>
        </Switch>
    );
};

export default Tips;