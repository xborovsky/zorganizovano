import React, { useContext } from 'react';

import PaginationContext from './PaginationContext';

const PaginationInfo = () => {
    const { page, pageSize, totalItems } = useContext(PaginationContext);    
    return (
        <span style={{ marginLeft : 8 }}>
            { page * pageSize - pageSize + 1 } - { page * pageSize > totalItems ? totalItems : page * pageSize } z { totalItems }
        </span>
    );
};

export default PaginationInfo;