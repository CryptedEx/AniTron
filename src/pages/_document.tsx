import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

const Doc = () => {
    async function getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps:any = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
    return (
        <Html>
            <Head>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
                <link href={'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css'} rel="stylesheet"
                      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
                      crossOrigin="anonymous"/>
            </Head>
            <body>
            <noscript>AniTron needs javascript to run :( , You can enable javascript in your browser</noscript>
            <Main/>
            <div id='alert-msg'></div>
            <NextScript/>
            </body>
        </Html>
    )
}

export default Doc;