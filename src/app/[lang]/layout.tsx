import type {Metadata} from 'next'

import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import {Lang} from '@/i18n/config'
import {Nunito, Poppins, Space_Mono} from 'next/font/google'
import Script from 'next/script'

import 'github-markdown-css/github-markdown.css'

import WebAppProvider from '@/components/Provider/WebAppProvider'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito'
})

const space_mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'HackQuest',
  description: 'Learn and Grow Careers in Web3.',
  robots: {
    index: process.env.RUNTIME_ENV === 'production',
    follow: process.env.RUNTIME_ENV === 'production',
    googleBot: {
      index: process.env.RUNTIME_ENV === 'production',
      follow: process.env.RUNTIME_ENV === 'production'
    }
  },
  icons: {
    icon: [
      {
        url: '/images/logo/logo.svg',
        href: '/images/logo/logo.svg'
      }
    ]
  }
}

// export async function generateStaticParams() {
//   return locales.map((lng) => ({ lng }));
// }

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    lang: Lang
  }
}

export default function RootLayout({
  children,
  params: {lang}
}: RootLayoutProps) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${nunito.variable} ${space_mono.variable} ${poppins.variable}`}
    >
      <body className={`${nunito.className}`}>
        <WebAppProvider lang={lang}>
          <InitializeUserProvider lang={lang}>
            {children}
          </InitializeUserProvider>
        </WebAppProvider>

        <Script id='theme-script'>
          {`const item = 'light';
          localStorage.setItem('theme', item);
          document.getElementsByTagName('html')[0].dataset.theme = item;
          document.documentElement.classList.add(item);
          document.documentElement.classList.remove(
            item === 'dark' ? 'light' : 'dark'
          );
          `}
        </Script>
      </body>
    </html>
  )
}
