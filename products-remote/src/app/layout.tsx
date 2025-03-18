import React from 'react';
import { Providers } from './providers';
import { ConfigProvider } from 'antd';
import trTR from 'antd/locale/tr_TR';

export const metadata = {
  title: 'Ürünler | E-Ticaret',
  description: 'E-Ticaret ürün listesi ve detayları',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <ConfigProvider locale={trTR}>
          <Providers>{children}</Providers>
        </ConfigProvider>
      </body>
    </html>
  );
}