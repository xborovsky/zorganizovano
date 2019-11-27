import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const theme = responsiveFontSizes(createMuiTheme())

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta
            name="description"
            content="Ahoj, jmenuji se Bára, jsem obyčejná máma jako vy, tak jako vy i já mám neobyčejné děti a vytíženého manžela 🙂 Starší Mareček už nám lítá téměř denně po kroužcích, Márovi-manželovi začala hokejová sezóna a babičky, tak ty máme daleko - a tak je zorganizovanost celé naší rodiny asi jedné východisko, jak to celé zvládnout v pohodě, bez stresu a o úsměvu a úctě si povíme zase v jiné pohádce ;) Jestli to máte podobně jako my, budu s vámi ráda sdílet tipy, které u nás doma fungují a připravuji pro vás i nějaké ty fyzické zlepšováky. Tak vzhůru dolů, jdeme se zorganizovat!"
          />
          <meta name="keywords" content="zorganizováno, zorganizovaná domácnost, organizovat, organizace, organizace domácnosti, tipy na organizaci, tipy na organizaci domácnosti, jak si zorganizovat čas, jak plánovat, zorganizovat, plánování času, plánujeme, organizace rodiny, rodinný kalendář, rodinný plánovací kalendář, plánovací kalendář, kalendář, závěsný kalendář, kalendář 2020, kalendář se jmény, kalendář pro rodinu, plánovač, kalendář na lednici, plánovat, naplánovat, kalendář pro děti, magnetický kalendář, liščí kalendář, měsíšní kalendář, měšíční kalendář, kalendář s kapsou" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Sacramento&display=swap" rel="stylesheet" />
          <style jsx global>
            {`
              html,
              body {
                height: 100%;
                width: 100%;
              }
              *,
              *:after,
              *:before {
                box-sizing: border-box;
              }
              body {
                font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
                font-size: 1rem;
                margin: 0;
              }
            `}
          </style>
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          {/*<strong id="unsupported-browser" style="display : none;">Váš prohlížeč není podporován. Použijte, prosím, některý z moderních prohlížečů, tzn. Chrome, Firefox, Opera, Safari, Edge</strong>*/}
          <Main />
          <NextScript />

          <script src="https://widget.packeta.com/www/js/library.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.5/platform.min.js" integrity="sha256-a5JlAx3qX6Rkvx+38zcjAPQLDQVUIwwwUeOrlDQ5W8s=" crossOrigin="anonymous"></script>
          {/* TODO <script>
            function isSupported(browser) {
              var browserVersionNum = +browser.version.split('.')[0];
              var browserName = browser.name.toLowerCase();

              if ((browserName.indexOf('chrome') > -1 && browserVersionNum > 23) ||
                (browserName.indexOf('firefox') > -1 && browserVersionNum > 21) ||
                (browserName.indexOf('safari') > -1 && browserVersionNum > 6) ||
                (browserName.indexOf('edge') > -1 && browserVersionNum > 12) ||
                (browserName.indexOf('opera') > -1 && browserVersionNum > 15)) {
                return true;
              }
              return false;
            }

            if (!isSupported(platform)) {
              document.getElementById('unsupported-browser').style.display = 'block';
            }
          </script>*/}
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>
    ]
  }
}

export default MyDocument