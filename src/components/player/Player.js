import React, {Component} from 'react';
import Head from '@symph/joy/head';
import {Link} from '@symph/joy/router';
import NekoModel from '../../models/model';
import controller from '@symph/joy/controller';
import {autowire} from '@symph/joy/autowire';
import Loading from '../../components/loading';
import PlayerList from '../playlist/PlayerList';
import style from './player.less';


// @requireModel(NekoModel)          // register model
@controller((state) => {              // state is store's state
    return {
        model: state.nekomusic, // bind model's state to props
    }
})

export default class Player extends Component {

    @autowire()
    nekoModel: NekoModel

    data = {
        playerList: [],
    };

    // path = '';
    //
    async componentPrepare() {
        const {dispatch} = this.props;
        await dispatch({
            type: "nekomusic/fetchMusic",
            mtype: "mp3"
        });
        await dispatch({
            type: "nekomusic/fetchMusic",
            mtype: "flac"
        });

        // call model's effect method
        /*await dispatch({
            type: 'nekoblog/fetchPostList',
            data: {
                pageNumber: 1,
                pageSize: 20,
            }
        });*/
    }

    componentDidMount() {
        console.log(this.props.model, "finish loading");
    }

    trigger = (currentHash) => {
        /*const currentMusic = this.state.playerList.filter(item => item.hashId === currentHash);
        this.refAudio.setAttribute("src", currentMusic[0].url);
        this.refAudio.play();
        console.log(this.refAudio);
        this.refAudio.addEventListener("durationchange", (e) => {
            console.log("trigger duration change");
        });
        window.PEO.trigger("plist_change");
        window.PEO.trigger("lrc_onload", currentMusic[0].name).then(() => {
            console.log(currentHash, currentMusic[0], 'trigger end');
        });*/
    }

    render() {

        if (this.props.model.loading || this.props.model.playerData.length === 0) {
            return (
                <Loading.Loading />
            )
        } else {
            console.log(this.props.model, "rendering");
        }

        return (
            <>
                <Head>
                    <title>Nekohand Blog </title>
                </Head>
                <div>
                    <h2>AIMI PLAYER</h2>
                    <audio preload="auto"
                           controls
                           src="https://file.ecs32.top/data%2Fmusic%2FArtist%2FInoriMinase%2F%5B2018.05.23%5DBLUE%20COMPASS%2F5f262ddf58adfe365b342874__06.%20%E3%82%A2%E3%82%A4%E3%83%9E%E3%82%A4%E3%83%A2%E3%82%B3.flac">
                        Your browser not supported
                    </audio>
                    <div id={"player"}>
                        <div dangerouslySetInnerHTML={{ __html: '<!--Controller-->' }} />
                        <div className="controller">
                            <div className="controller-buttons">
                                <div className={style.button}>
                                    <svg viewBox="0 0 40 40" id="prev">
                                        <path d="M23.336,34.515c1.117,0.727,2.032,0.231,2.033-1.102l0.02-26.752c0.001-1.333-0.913-1.829-2.03-1.103   L3.11,18.716c-1.118,0.726-1.118,1.915-0.001,2.642L23.336,34.515z"></path>
                                        <path d="M37.269,34.515c1.117,0.727,2.032,0.231,2.033-1.102l0.02-26.752c0.001-1.333-0.913-1.829-2.03-1.103   L17.043,18.716c-1.118,0.726-1.118,1.915-0.001,2.642L37.269,34.515z"></path>
                                    </svg>
                                </div>
                                <div className={style.button}>
                                    <svg viewBox="0 0 40 40" id="play">
                                        <path d="M8.625,2.723c-1.34-0.872-2.437-0.277-2.438,1.322L6.163,36.128c-0.001,1.598,1.094,2.194,2.435,1.323   L35.289,21.67c1.34-0.871,1.341-2.297,0.001-3.168L8.625,2.723z"></path>
                                    </svg>
                                </div>
                                <div className={style.button}>
                                    <svg viewBox="0 0 40 40" id="pause">
                                        <path d="M36,32.196C36,33.192,35.192,34,34.196,34h-8.392C24.808,34,24,33.192,24,32.196V6.804   C24,5.808,24.808,5,25.804,5h8.392C35.192,5,36,5.808,36,6.804V32.196z"></path>
                                        <path d="M17,32.196C17,33.192,16.192,34,15.196,34H6.804C5.808,34,5,33.192,5,32.196V6.804C5,5.808,5.808,5,6.804,5   h8.392C16.192,5,17,5.808,17,6.804V32.196z"></path>
                                    </svg>
                                </div>
                                <div className={style.button}>
                                    <svg viewBox="0 0 40 40" id="next">
                                        <path d="M18.641,5.658c-1.113-0.724-2.025-0.23-2.026,1.098l-0.02,26.661c-0.001,1.328,0.909,1.823,2.023,1.099   l20.181-13.114c1.114-0.724,1.114-1.908,0.001-2.633L18.641,5.658z"></path>
                                        <path d="M4.755,5.658C3.642,4.933,2.73,5.427,2.729,6.756l-0.02,26.661c-0.001,1.328,0.909,1.823,2.023,1.099   l20.181-13.114c1.114-0.724,1.114-1.908,0.001-2.633L4.755,5.658z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="controller-bar">
                                <div className="controller-loaded" />
                                <div className="controller-played">
                                    <span className="bar-thumb" style={{display: "none"}} >
                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32">
                                            <path d="M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12c0 1.2-0.8 2-2 2s-2-0.8-2-2c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.2 0 2 0.8 2 2s-0.8 2-2 2c-6.6 0-12-5.4-12-12z"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="controller-timer">
                                <span className="pt">00:00</span>
                                <span className="tt">00:00</span>
                            </div>
                            <div className="controller-customized">
                                <div className="controller-audio" />
                                <div className="controller-playlist" />
                                <div className="controller-lrc" />
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: '<!--Playerlist-->' }} />
                        <PlayerList listData={this.props.model.playerData} />
                    </div>
                </div>

            </>
        );
    }
}