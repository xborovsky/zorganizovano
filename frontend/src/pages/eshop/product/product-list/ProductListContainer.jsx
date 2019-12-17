import React from 'react';
import { Helmet } from 'react-helmet';

import ProductList from './ProductList';
import MainText from './MainText';
import DataFetcher from 'components/DataFetcher';
import BreadcrumbsNav from 'components/BreadcrumbsNav';

const ProductListContainer = ({ data }) => (
    <>
        <Helmet>
            <meta name="description" content='Veškeré produkty vznikly z reálné potřeby naší domácnosti. Rodinný plánovací kalendář 2020 se jmény
                členů rodiny po straně, stolní kalendář, do kterého děti malují nebo vlepují obrázky či fotky, pro babičky, rodinný plánovací diář
                i plán na vánoční svátky.' />
        </Helmet>
        <BreadcrumbsNav items={[{ name : 'eshop' }]} />
        <MainText />
        <DataFetcher url='/item'>
            { data => <ProductList products={data} /> }
        </DataFetcher>
    </>
);

export default ProductListContainer;