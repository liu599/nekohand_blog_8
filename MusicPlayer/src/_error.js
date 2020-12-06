// /src/_document.js
import React from 'react';
import Document, {Head, JoyScript, Main} from '@symph/joy/document'

export default class _Error extends Document {
    render () {
        const { statusCode, message } = this.props;
        const title = statusCode === 404
            ? 'This page could not be found'
            : 'An unexpected error has occurred';

        return (
            <html>
                <Head>
                    <title>{statusCode}: {title}</title>
                </Head>
                <body>
                    <h1>{statusCode}</h1>
                    <div>{message}</div>
                    <Main />
                    <JoyScript />
                </body>

            </html>
        );
    }
}