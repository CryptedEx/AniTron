import '@assets/styles/global.css';
import {Scrollbars} from 'react-custom-scrollbars';
import Navbar from '@components/General/Navbar';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';
import {DefaultSeo} from 'next-seo';
import {useWindowSize} from '@services/Functions';
import type { AppProps } from 'next/app'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const App = ({Component, pageProps}: AppProps) => {
    const size: any = useWindowSize();
    return (
        <>
            <DefaultSeo
                title="AniTron"
                description="Watch anime and read manga ad free, for free"
                additionalMetaTags={[
                    {
                        name: 'keywords',
                        content: 'watch animes, animes online, anime ads-free, ad free anime, anime, read mangas, mangas online, v1 ads-free ad free v1, v1',
                    },
                    {
                        name: 'theme-color',
                        content: '#A020F0',
                    },
                    {
                        name: 'applie-mobile-web-app-capable',
                        content: 'yes',
                    },
                    {
                        name: 'apple-mobile-web-app-status-bar-style',
                        content: '#A020F0',
                    },
                ]}
                twitter={{
                    cardType: 'summary_large_image',
                }}
                openGraph={{
                    site_name: 'AniTron',
                    images: [
                        {
                            url: '/logo.png',
                            alt: 'AniTron',
                            type: 'small',
                        },
                    ],
                }}
            />
            <Navbar/>
            <Scrollbars
                autoHeight
                autoHeightMin={0}
                autoHeightMax={size.height}
                universal={true}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                thumbMinSize={125}
                thumbSize={size.height / 4}
                renderThumbVertical={({style, ...props}) =>
                    <div {...props} className={"rounded-xl bg-[#A020F0]"} style={{...style}}/>
                }>
                <Component {...pageProps} />
            </Scrollbars>
        </>
    )
}

export default App;
