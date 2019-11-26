import React, { Component } from 'react';

import PublicLayout from '~/components/layout/LayoutPublic';

const withPublicLayout = Page => {
    return class WithPublicLayout extends Component {
        static async getInitialProps(ctx) {
            let componentProps = {};

            if (Page.getInitialProps) {
                componentProps = await Page.getInitialProps(ctx);
            }


            return {...componentProps};
        }

        render() {
            return (
                <PublicLayout>
                    <Page {...this.props} />
                </PublicLayout>
            );
        }
    }
};

export default withPublicLayout;