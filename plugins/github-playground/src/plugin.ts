import { createPlugin, createRouteRef } from '@backstage/core';
import ExampleComponent from './components/ExampleComponent';

export const rootRouteRef = createRouteRef({
  path: '/github-playground',
  title: 'github-playground',
});

export const plugin = createPlugin({
  id: 'github-playground',
  register({ router }) {
    router.addRoute(rootRouteRef, ExampleComponent);
  },
});
