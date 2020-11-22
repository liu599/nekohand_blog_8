// /src/_document.js
import React from 'react'
import Document, { Head, Main, JoyScript } from '@symph/joy/document'

export default class MyDocument extends Document {
    render () {
        return (
            <html>
            <Head>
                {/* add custom style */}
                <link rel='stylesheet' href='/static/font/css/fontello.css' />
                <meta name="description"
                      content="Nekohand's Blog. BanG Dream - Shojo Kageki - Technology - Blog" />
                <meta name="keywords" content="ブシロード,ブシモ,バンドリ！ ガールズバンドパーティ！,ガルパ,BanG Dream!,Poppin'Party,ポピパ,Afterglow,アフターグロウ,Pastel＊Palettes,パスパレ,Roselia,ロゼリア,ハロー、ハッピーワールド！,ハロハピ"/>
                <meta name="format-detection" content="telephone=no, email=no, address=no"/>
                <meta name="viewport"
                      content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
                <meta property="og:title" content="Nekohand 公式サイト"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://blog.nekohand.moe"/>
                <meta property="og:image" content="https://bandori.nekohand.moe/nekofile/5befc03e421aa941eefd50f9/"/>
                <meta property="og:site_name" content="Nekohand"/>
                <meta property="og:description" content="アニメ、ゲーム、コミック、声優によるリアルライブなど様々なメディアミックスを展開する次世代ガールズバンドプロジェクトBanG Dream!（バンドリ！）"/>
            </Head>
            <body>
                <Main />
                <JoyScript />
            </body>
            </html>
        )
    }
}