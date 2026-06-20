import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'McLaren 720S | Uncompromised Performance',
  description: 'Experience the extreme performance and futuristic design of the McLaren 720S.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="bg-base text-text antialiased font-sans selection:bg-primary/30 selection:text-primary-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
