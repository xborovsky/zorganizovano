import React from 'react';

import BreadcrumbsNav from '../../../../../components/BreadcrumbsNav';

const buildBreadcrumbsArray = (categoriesTree, skipFirst) => {
    let arr = [];
    let cat = categoriesTree;

    while (cat.parent != null) {
        arr.push({ name : cat.name, link : (skipFirst && arr.length === 0) ? undefined : `/eshop?categoryId=${cat.id}` });
        cat = cat.parent;
    }

    arr.push({ name : 'eshop', link : (skipFirst && arr.length === 0) ? undefined : '/eshop' });

    return arr.reverse();
};

const ProductBreadcrumbs = ({ categoriesTree, currentProductName }) => {
    const skipFirst = !!!currentProductName;
    const breadcrumbItems = categoriesTree ?
        currentProductName ?
            [...buildBreadcrumbsArray(categoriesTree, skipFirst), { name : currentProductName }] : 
            buildBreadcrumbsArray(categoriesTree, skipFirst) :
        [{ name : 'eshop' }];

    return (
        <BreadcrumbsNav items={breadcrumbItems} />
    );
};

export default ProductBreadcrumbs;