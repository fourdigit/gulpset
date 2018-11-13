import * as React from 'react';
import { Layout } from '_layout';
import Textfield from 'components/atoms/textfield/_textfield';

const metaProps = {
  title: 'intro title'
};

export default () => (
  <Layout {...metaProps}>
    hello world
    <Textfield />
  </Layout>
);
