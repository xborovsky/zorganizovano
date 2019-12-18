import React from 'react';
import { useParams } from 'react-router-dom';

import DataFetcher from 'components/DataFetcher';
import TipDetail from './TipDetail';

const TipDetailContainer = () => {
    let { id } = useParams();

    return (
        <DataFetcher url={`/blog/posts/${id}`}>
            { data => ( <TipDetail tip={data} /> ) }
        </DataFetcher>
    );
};

export default TipDetailContainer;