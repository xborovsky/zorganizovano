import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import YearSelect from './components/YearSelect';
import ProductsByYearDataTable from './components/ProductsByYearDataTable';
import AuthDataFetcher from '../../components/AuthDataFetcher';

const ProductsByYear = () => {
    const [ year, setYear ] = useState(new Date().getFullYear());

    const handleYearChange = year => setYear(year);

    return (
        <>
            <h2 style={{ marginTop : '1rem', marginLeft : '2rem' }}>Počty prodaných kusů dle roku</h2>
            <AuthDataFetcher queryId={['products-by-year-report-available-years']} url={`/admin/reports/products-by-year/available-years`}>
                { data => (
                    <Grid container>
                        <Grid item xs={12} style={{ margin : '20px auto 20px 10px', textAlign : 'left' }}>
                            <YearSelect 
                                availableYears={data} 
                                onYearChange={handleYearChange} 
                            />
                        </Grid>
                        <Grid item xs={12} style={{ margin : '20px auto 20px 10px', textAlign : 'left' }}>
                            <ProductsByYearDataTable year={year} />
                        </Grid>
                    </Grid>
                )}
            </AuthDataFetcher>
        </>
    );
};

export default ProductsByYear;