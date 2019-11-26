import React from 'react';

import PublicLayout from '~/components/layout/LayoutPublic';

const withPublicLayout = Page => () => (
    <PublicLayout>
        <Page />
    </PublicLayout>
);

export default withPublicLayout;