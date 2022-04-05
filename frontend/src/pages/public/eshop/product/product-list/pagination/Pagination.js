import React, { useContext } from 'react';
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import PaginationContext from './PaginationContext';
import { Hidden } from '@mui/material';

const MyPagination = () => {
    const { page, pageSize, currentSelectedCategory, totalItems } = useContext(PaginationContext);
    
    if (totalItems <= pageSize) {
        return null;
    }

    return <>
        <Hidden mdDown>
            <Pagination
                page={page}
                count={Math.ceil((totalItems || 0) / pageSize)}
                color="primary"
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`/eshop/products?categoryId=${currentSelectedCategory}&limit=${pageSize}&page=${item.page}`}
                        {...item}
                    />
                )}
                showFirstButton
                showLastButton
                style={{ float : 'right' }}
            />
        </Hidden>
        <Hidden mdUp>
            <Pagination
                page={page}
                count={Math.ceil((totalItems || 0) / pageSize)}
                color="primary"
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`/eshop/products?categoryId=${currentSelectedCategory}&limit=${pageSize}&page=${item.page}`}
                        {...item}
                    />
                )}
                showFirstButton
                showLastButton
                size="small"
                siblingCount={0}
                style={{ float : 'right' }}
            />
        </Hidden>
    </>;
};

export default MyPagination;