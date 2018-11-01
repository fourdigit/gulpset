import React from 'react';

import { Layout } from './_layout';

const metaProps = {
  title: 'intro title'
};

export default () => (
  <Layout {...metaProps}>
    hello <div>world</div>
  </Layout>
);
