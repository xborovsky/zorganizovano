import { createContext } from 'react';

export const StockItemContext = createContext({
    showSaveCancel : false,
    showSaveProgress : false,
    error : undefined,
    showSuccess : false
});