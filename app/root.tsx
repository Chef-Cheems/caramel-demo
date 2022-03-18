import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import type { MetaFunction } from 'remix';
import { globalStyles } from './stitches.config';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'GM Caramel',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  globalStyles();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
