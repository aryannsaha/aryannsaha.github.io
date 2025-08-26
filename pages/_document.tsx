import { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M61FCSRJR9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-M61FCSRJR9');
        `}
        </Script>
        <style>
          {`
            /* Global link styles - exclude navigation */
            a:not(.chakra-link) {
              color: #3182ce !important;
              text-decoration: none !important;
            }
            a:not(.chakra-link):hover {
              color: #805ad5 !important;
              text-decoration: none !important;
            }
            
            /* Landing page attribution styles */
            #landing-attribution {
              position: fixed !important;
              bottom: 18px !important;
              left: 0 !important;
              right: 0 !important;
              font-size: 50px !important;
              color: #a0a0a0 !important;
              text-align: center !important;
              z-index: 9999 !important;
            }
            #landing-attribution a {
              color: #a0a0a0 !important;
              text-decoration: none !important;
            }
            #landing-attribution a:hover {
              color: #666 !important;
            }
          `}
        </style>
      </Head>
      <body>
        <ColorModeScript initialColorMode="light" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
