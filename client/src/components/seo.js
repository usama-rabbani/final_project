
import Head from 'next/head';

const SeoMeta = ({ title, description , url }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content="noindex"></meta>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="topproviders.net" />
            <meta property="article:publisher" content="https://www.facebook.com/topproviders.net" />
            <meta property="article:modified_time" content="2023-07-06T22:58:46+00:00" />
            <meta property="og:image" content="https://www.topproviders.net/logo.png" />
            <meta property="og:image:width" content="254" />
            <meta property="og:image:height" content="56" />
            <meta property="og:image:type" content="image/png" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@cablemovers" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Head>
    );
};

export default SeoMeta;
