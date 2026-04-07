import type { Metadata } from 'next';
import { Libre_Baskerville } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { Providers } from '@/components/Providers';
import './globals.css';

const libreBaskerville = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: { default: 'Gauyog Admin', template: '%s | Gauyog Admin' },
  description: 'Admin panel for Gauyog e-commerce platform',
  robots: 'noindex,nofollow',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={libreBaskerville.className}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
