import React, { Component } from 'react'
import { Switch, Route, Link } from '@symph/joy/router'
import AppController from './controllers/AppController'
import './common/styles/normalize.css';
import './common/styles/nprogress.css';
import './common/styles/main.less';
import headerStyles from './common/styles/header.less';
import footerStyles from './common/styles/footer.less';
import bodyStyles from './common/styles/body.less';
import Player from './components/player/index';
// import Lazyimg, { withLazyimg } from 'react-lazyimg-component';
import component404 from './_error.js';


const dictChs = ['首页', '关于'];
const dictEn = ['HOME', 'ABOUT'];
const dictLink = ['/', '/'];

export default class Main extends Component {

    render () {
        return (
            <>
                <AppController>
                    <nav className={headerStyles.nhNavigation}>
                        <div className={headerStyles.logoContainer}>
                            <h1 className={headerStyles.logo}>
                                <a href="https://music.ecs32.top" rel="home" title="猫">NekoMusic</a>
                            </h1>
                        </div>
                        <ul className={headerStyles.menu}>
                            {
                                dictChs.map((di, index) => (
                                    <li className={headerStyles.menuItem} key={index}>
                                        <Link to={{
                                                pathname: dictLink[index]
                                            }}
                                           target={dictLink[index] && dictLink[index].includes("http") ? "_blank" : ""}
                                           className={headerStyles.menuItemLink}
                                        >
                                            <span className={headerStyles.fontChs}>{di}</span>
                                            <span className={headerStyles.fontEn}>{dictEn[index]}</span>
                                        </Link>
                                    </li>
                                ))
                            }
                            {/*<li className={headerStyles.menuItem}>
                                <a href={'https://apps.nekohand.moe/'}
                                      target={'_blank'}
                                      className={headerStyles.menuItemLink}
                                >
                                    <span className={headerStyles.fontChs}>应用</span>
                                    <span className={headerStyles.fontEn}>APP</span>
                                </a>
                            </li>*/}
                        </ul>
                    </nav>
                    <header className={headerStyles.nhHeader}>
                        <img className={"lazy"}
                             src="https://blog.ecs32.top/static/bangdreampromote.354e8124.png"
                             alt="banner"
                        />
                        <div className={headerStyles.banner}>
                            <div className={headerStyles.bannerTxt}>
                                {/*<h1 className={headerStyles.siteTitle}>Welcome to Nekohand Blog</h1>*/}
                                {/*<h3 className={headerStyles.siteSlogan}>ポジションゼロ</h3>*/}
                            </div>
                        </div>
                    </header>
                    <main className={bodyStyles.main}>
                        <div className={bodyStyles.wrapper}>
                            <section className={bodyStyles.left}>
                                <Switch>
                                    <Route exact path="/" component={Player.Player}/>
                                    <Route component={component404} />
                                </Switch>
                            </section>
                        </div>
                    </main>
                    <footer className={footerStyles.footer}>
                        <div className={footerStyles.footerInfo}>
                            <p>Copyrights © 2020 Nekohand 公式サイト委員會<i style={{verticalAlign: 'super'}} className={"demo-icon icon-trademark"} />. </p>
                            <p>All Rights Reserved: Tokei .</p>
                            <p>Version: 1.0.0.202012 <a href={`https://lnlfps.github.io/symph-joy`} target={`_blank`} title={`Minimalistic framework for React applications, inspiration comes from Next.js and Dva`} >Kasumi-SymphJoy</a>
                                <a href="https://tae.nekohand.moe" target={`_blank`} className="author_name" title={`文章管理`}>
                                    <i className={"demo-icon icon-star"} />
                                </a>.</p>
                            <p style={{display: "none"}}>沪ICP备17006741号 - ecs32.top</p>
                        </div>
                    </footer>
                </AppController>
            </>
        )
    }
}