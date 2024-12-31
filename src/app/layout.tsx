import SessionProvider from '@/app/components/SessionProvider';
import '@/app/globals.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Geist_Mono } from 'next/font/google';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BETAMI',
  description: 'be better every day',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased grid place-content-center`}>
        <SessionProvider session={session}>
          {/* <NavMenu /> */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
