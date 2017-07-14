// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document';
import stylesheet from '../styles/main.scss';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    return { html, head, errorHtml, chunks };
  }

  render() {
    return (
      <html>
        <Head>
          <title>Askimovie - Demandez-lui</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" />
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
