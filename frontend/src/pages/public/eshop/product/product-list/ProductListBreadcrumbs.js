import React from 'react';

import BreadcrumbsNav from '../../../../../components/BreadcrumbsNav';

const buildBreadcrumbsArray = currentCategory => {
    let arr = [];
    let cat = currentCategory;

    while (cat.parent != null) {
        arr.push({ name : cat.name, link : arr.length === 0 ? undefined : `/eshop?categoryId=${cat.id}` });
        cat = cat.parent;
    }

    arr.push({ name : 'eshop', link : arr.length === 0 ? undefined : '/eshop' });

    return arr.reverse();
};

const ProductListBreadcrumbs = ({ categories }) => {
    const breadcrumbItems = categories ?
        buildBreadcrumbsArray(categories) : 
        [{ name : 'eshop' }];

    return (
        <BreadcrumbsNav items={breadcrumbItems} />
    );
};

export default ProductListBreadcrumbs;