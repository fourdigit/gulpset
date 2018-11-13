import * as React from 'react';

export interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  ogImg?: string;
  ogType?: string;
  children?: any;
}

export const Layout = ({
  title = '共通タイトル',
  description = '共通description',
  keywords = '共通,keyword',
  url = 'http://domain.com/',
  ogImg = 'http://domain.com/ogp.png',
  ogType = 'article',
  children
}: LayoutProps) => (
  <html lang="ja">
    <head>
      <meta name="viewport" content="width=device-width, user-scalable=no" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta charSet="UTF-8" />
      <meta name="format-detection" content="telephone=no" />

      <link rel="manifest" href="./manifest.json" />
      <link rel="apple-touch-icon" sizes="57x57" href="./favicon/apple-touch-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="./favicon/apple-touch-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="./favicon/apple-touch-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="./favicon/apple-touch-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="./favicon/apple-touch-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="./favicon/apple-touch-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="./favicon/apple-touch-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="./favicon/apple-touch-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="./favicon/apple-touch-icon-180x180.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="./favicon/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="./favicon/favicon-48x48.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="./favicon/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="./favicon/favicon-160x160.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="./favicon/favicon-196x196.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png" />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:description" content={description} />

      <link rel="stylesheet" href="/assets/css/app.css" />
      <script src="/assets/js/app.js" />
      <script dangerouslySetInnerHTML={{ __html: 'console.warn("sample script")' }} />
    </head>
    <body>{children}</body>
  </html>
);
