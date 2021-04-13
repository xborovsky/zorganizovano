import { createContext } from 'react';

const PaginationContext = createContext({
    page : 1,
    itemsPerPage : 9,
    onItemsPerPageChange : () => {},
    currentSelectedCategory : 0,
    totalItems : 0
});

export default PaginationContext;