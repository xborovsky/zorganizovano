import React from 'react';
import { Switch, Route } from 'react-router';

export default (
    <Switch>
        <Route path='/' />
        <Route path='/tips' />
        <Route path='/eshop'>
            <Route path='/faq' />
            <Route path='/terms' />
            <Route path='/personal-data-protection-terms' />
            <Route path='/reclamation-terms' />
        </Route>
        <Route path='/contact' />
        <Route path='/shopping-cart' />
        <Route path="*" />
    </Switch>
);