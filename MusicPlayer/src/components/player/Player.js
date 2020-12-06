import React, {Component} from 'react';
import NekoModel from '../../models/model';
import controller from '@symph/joy/controller';
import {autowire} from '@symph/joy/autowire';
import Loading from '../loading';
import PlayerList from '../playlist/PlayerList';
import MusicModel from "../../models/music";
import style from './player.less';

const timeToString = (dd) => {
    if (typeof dd !== "number") {
        return "00:00"
    }
    let tempMin = parseInt(dd / 60);
    let tempSec = parseInt(dd % 60);
    let p0 = tempMin < 10 ? ('0' + tempMin) : tempMin;
    let p1 = tempSec < 10 ? ('0' + tempSec) : tempSec;
    return `${p0}:${p1}`
}

// const [userModel, todoModel] = exports.useModel([NekoModel, MusicModel])
//@requireModel(MusicModel)
//@requireModel(NekoModel)          // register model
@controller((state) => {// state is store's state
    return {
        model: state.nekomusic,
        eves: state.muse,
    }
})

export default class Player extends Component {

    @autowire()
    nekoModel: NekoModel;
    @autowire()
    muse: MusicModel;

    ref = null;
    refList = null;
    setRef = (dom) => this.ref = dom;
    setList = (dom) => this.refList = dom;

    data = {
        playerList: [],
    };

    state = {
        canSee: true,
        canSeeSeekIcon: false,
        instance: {
            FileNo: 173,
            album: "[2016.02.24] Yes! BanG_Dream!",
            artist: "Poppin'Party",
            cover: "https://file.ecs32.top/data/music/B/A_PPP/%5B2016.02.24%5D%20Yes%21%20BanG_Dream%21/cover.jpg",
            createdAt: 1575225466,
            fileId: "5de4087a58adfe658f3f04e3",
            fileName: "01.%20Yes%21%20BanG_Dream%21.mp3",
            filetype: "mp3",
            hashId: "b05b24198fc9522f16ffb6432be01c50",
            lrc: null,
            modifiedAt: 1575225466,
            name: "Yes! BanG_Dream!",
            relativePath: "/B/A_PPP/%5B2016.02.24%5D%20Yes%21%20BanG_Dream%21/",
            src: "/B/A_PPP/%5B2016.02.24%5D%20Yes%21%20BanG_Dream%21/5de4087a58adfe658f3f04e3__01.%20Yes%21%20BanG_Dream%21.mp3",
            url:"https://file.ecs32.top/data%2Fmusic%2FArtist%2FInoriMinase%2F%5B2018.05.23%5DBLUE%20COMPASS%2F5f262ddf58adfe365b342874__06.%20%E3%82%A2%E3%82%A4%E3%83%9E%E3%82%A4%E3%83%A2%E3%82%B3.flac",
        },
        curTime: "00:00",
        totalTime: "00:00",
        totalTimeNumber: 0,
        curTimeNumber: 0,
        percentage: 0.0,
        playMode :1,
        loadMusicInstance: false
    }


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

    }

    initPlayer = () => {
        console.log(this, this.ref, "1x033s");
        this.ref && this.ref.addEventListener("progress", () => {
            console.log(this.ref.buffered, "buffered");
        });
        this.ref && this.ref.addEventListener("seeking", () => {
            console.log("seeking... please wait");
            this.pause();
        });
        this.ref && this.ref.addEventListener("seeked", () => {
            console.log("seeked");
            this.playMusic();
        });
        this.ref && this.ref.addEventListener("canplay", () => {
            this.setState({
                totalTime: timeToString(this.ref.duration),
                totalTimeNumber: this.ref.duration,
                percentage: 0.0
            })
        });
        this.ref && this.ref.addEventListener("timeupdate", () => {
            // console.log(this.ref.currentTime)
            this.setState({
                curTime: timeToString(this.ref.currentTime),
                curTimeNumber: this.ref.currentTime,
            })
            this.onProgress();
        });
        this.ref && this.ref.addEventListener("pause", () => {
            console.log("pause");
            this.setState({
                canSee: true,
            })
        });
        this.ref && this.ref.addEventListener("emptied", () => {
            this.setState({
                canSee: true,
                percentage: 0.0
            })
        });
        this.ref && this.ref.addEventListener("ended", () => {
            this.setState({
                canSee: true,
                percentage: 0.0
            }, () => {
                this.loadmusic([this.refList.next()]);
            })
        });
        // TODO: Batch add..
        this.ref && this.ref.addEventListener("play", () => {
            this.setState({
                canSee: false,
            })
        });
    }

    componentDidMount() {
        // console.log("componentDidMount", this.muse.fetchAmiEvent())
        console.log(this.props.model, "loading play event..");
        this.muse.fetchAmiEvent().listen("loadmusic", this.loadmusic);
        let self = this;
        const setMusicEvents = new Promise((resolve) => {
             setTimeout(() => {
                self.initPlayer();
                resolve();
            }, 2000);
        });
        Promise.allSettled([setMusicEvents]).then(() => {
            console.log("check out");
            if (this.ref === null) {
                console.log("check out failed");
                setTimeout(() => {
                    this.initPlayer();
                    this.setState({
                        loadMusicInstance: true
                    })
                }, 3000)
            } else {
                this.setState({
                    loadMusicInstance: true
                })
            }
        })

    }

    switchMode = (playMode) => {
        this.muse.fetchAmiEvent().setPlayerMode(playMode);
        this.setState({
            playMode
        })
    }

    loadmusic = (instance) => {
        console.log(instance);
        if (!this.ref) {
            console.error("cannot load music");
            return
        }
        /*
	*
	*   FileNo: 173
		album: "[2016.02.24] Yes! BanG_Dream!"
		artist: "Poppin'Party"
		cover: "https://file.ecs32.top/data/music/B/A_PPP/%5B2016.02.24%5D%20Yes%21%20BanG_Dream%21/cover.jpg"
		createdAt: 1575225466
		fileId: "5de4087a58adfe658f3f04e3"
		fileName: "01.%20Yes%21%20BanG_Dream%21.mp3"
		filetype: "mp3"
		hashId: "b05b24198fc9522f16ffb6432be01c50"
		lrc: null
		modifiedAt: 1575225466
		name: "Yes! BanG_Dream!"
		relativePath: "/B/A_PPP/%5B2016.02.24%5D%20Yes%21%20BanG_Dream%21/"
		src: "/B/A_PPP/%5B2016.02.24%5D%20Yes%21%20BanG_Dream%21/5de4087a58adfe658f3f04e3__01.%20Yes%21%20BanG_Dream%21.mp3"
		url:"https://file.ecs32.top/data%2Fmusic%2FArtist%2FInoriMinase%2F%5B2018.05.23%5DBLUE%20COMPASS%2F5f262ddf58adfe365b342874__06.%20%E3%82%A2%E3%82%A4%E3%83%9E%E3%82%A4%E3%83%A2%E3%82%B3.flac"
	*
	*
	* */
        if (Array.isArray(instance) && Promise.resolve(instance[0]) === instance) {
            console.log("loading music");
        } else {
            let newPromise = new Promise((resolve, reject) => {
                resolve(instance[0]);
            })
            instance = [newPromise];
        }
        console.log(instance);

        Promise.allSettled(instance).then(
            (results) =>
                results.forEach(
                    (result) => {
                        console.log(result, this.state);
                        this.setState({
                            instance: result.value,
                        }, () => {
                            this.playMusic();
                        });
                    }));
    }

    playMusic = () => {
        this.ref.play();

        this.setState({
            canSee: false,
        })

    }

    maxRecWidth = 0;
    seekMusic = (ev) => {
        let clientBarWidth = ev.target.getBoundingClientRect().width;
        if (clientBarWidth > this.maxRecWidth) {
            this.maxRecWidth = clientBarWidth;
        }
        ev.persist();
        ev.stopPropagation();
        console.log(ev.clientX, ev.target.getBoundingClientRect(), this.maxRecWidth);
        let startBoundingPoint = ev.target.getBoundingClientRect().x;
        let pos = ev.clientX - startBoundingPoint;
        let percentage = Math.min((pos / this.maxRecWidth)*100, 100);
        this.ref.currentTime = percentage * this.ref.duration * 0.01;
        this.setState({
            percentage,
            canSeeSeekIcon: true,
        })
    }

    pause = () => {
        this.ref.pause();
        this.setState({
            canSee: true,
        })
    }

    onProgress = () => {
        // console.log("on progress")
        let {totalTimeNumber, curTimeNumber} = this.state;
        this.setState({
            percentage: Math.min((curTimeNumber /  totalTimeNumber)*100, 100),
        })
    }

    render() {

        if (this.props.model.loading || this.props.model.playerData.length === 0 ) {
            return (
                <Loading.Loading />
            )
        }

        let {instance} = this.state

        return (
            <>
                <div>
                    <audio preload="auto"
                           ref={this.setRef}
                           controls
                           src={instance.url}>
                        Your browser not supported
                    </audio>
                    <div id={"player"}>
                        <div dangerouslySetInnerHTML={{ __html: '<!--Metadata-->' }} />
                        <div className="metadata">
                            <div className="music-title">{instance.name}</div>
                            <div className="music-artist">{instance.artist}</div>
                            <div className="music-album-name">{instance.album}</div>
                            <div className="music-album-thumb">
                                {/*<p>占位</p>*/}
                                <img
                                src={instance.cover}
                                alt="No Image"
                                ref={(thisNode) => {
                                    // onLoad replacement for SSR
                                    if (!thisNode) { return; }
                                    //  Acquire
                                    // const updateFunc = () => {
                                    //     console.log("loading this image");
                                    // };
                                    // if (img.complete) {
                                    //     updateFunc();
                                    // }
                                    // Loading
                                    thisNode.onload = () => {
                                        // let newP = document.createElement("p");
                                        // newP.innerHTML = "加载";
                                        // thisNode.parentNode.append(newP);
                                        // console.log("complete", thisNode, thisNode.parentNode, this.state);
                                        // 删去加载符
                                        // thisNode.parentNode.querySelector("p").remove();
                                        // 增加一个FinishTag
                                        thisNode.setAttribute("data-finish", "1");
                                        // this.handleImgLoading();
                                        console.log(thisNode.complete)
                                    };
                                }}
                                width={120} height={120}/>

                            </div>
                            <div className="music-publish-date">{instance.createdAt}</div>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: '<!--Lrc-->' }} />
                        <div className="dynamicLrc">
                            <h4>LRC</h4>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: '<!--Controller-->' }} />
                        <div className="controller">
                            <div className="controller-buttons">
                                <div className={style.button}  onClick={() => {
                                    this.loadmusic([this.refList.prev()]);
                                }}>
                                    <svg viewBox="0 0 40 40" id="prev">
                                        <path d="M23.336,34.515c1.117,0.727,2.032,0.231,2.033-1.102l0.02-26.752c0.001-1.333-0.913-1.829-2.03-1.103   L3.11,18.716c-1.118,0.726-1.118,1.915-0.001,2.642L23.336,34.515z" />
                                        <path d="M37.269,34.515c1.117,0.727,2.032,0.231,2.033-1.102l0.02-26.752c0.001-1.333-0.913-1.829-2.03-1.103   L17.043,18.716c-1.118,0.726-1.118,1.915-0.001,2.642L37.269,34.515z" />
                                    </svg>
                                </div>
                                {
                                    (this.state.canSee) ?
                                        <div className={style.button} onClick={this.playMusic}>
                                            <svg viewBox="0 0 40 40" id="play">
                                                <path d="M8.625,2.723c-1.34-0.872-2.437-0.277-2.438,1.322L6.163,36.128c-0.001,1.598,1.094,2.194,2.435,1.323   L35.289,21.67c1.34-0.871,1.341-2.297,0.001-3.168L8.625,2.723z" />
                                            </svg>
                                        </div> :
                                        <div className={style.button} onClick={this.pause}>
                                            <svg viewBox="0 0 40 40" id="pause">
                                                <path d="M36,32.196C36,33.192,35.192,34,34.196,34h-8.392C24.808,34,24,33.192,24,32.196V6.804   C24,5.808,24.808,5,25.804,5h8.392C35.192,5,36,5.808,36,6.804V32.196z" />
                                                <path d="M17,32.196C17,33.192,16.192,34,15.196,34H6.804C5.808,34,5,33.192,5,32.196V6.804C5,5.808,5.808,5,6.804,5   h8.392C16.192,5,17,5.808,17,6.804V32.196z" />
                                            </svg>
                                        </div>
                                }
                                <div className={style.button} onClick={() => {
                                    this.loadmusic([this.refList.next()]);
                                }}>
                                    <svg viewBox="0 0 40 40" id="next">
                                        <path d="M18.641,5.658c-1.113-0.724-2.025-0.23-2.026,1.098l-0.02,26.661c-0.001,1.328,0.909,1.823,2.023,1.099   l20.181-13.114c1.114-0.724,1.114-1.908,0.001-2.633L18.641,5.658z" />
                                        <path d="M4.755,5.658C3.642,4.933,2.73,5.427,2.729,6.756l-0.02,26.661c-0.001,1.328,0.909,1.823,2.023,1.099   l20.181-13.114c1.114-0.724,1.114-1.908,0.001-2.633L4.755,5.658z" />
                                    </svg>
                                </div>
                            </div>
                            <div className={style.bar} >
                                <div className={style.barWrap}>
                                    <div className={style.barProgress} onClick={this.seekMusic}>
                                        <div className="controller-loaded" />
                                        <div className={style.barPlayed} style={{
                                            width: `${this.state.percentage}%`,
                                            background: "red",
                                        }}>
                                            {(this.state.canSeeSeekIcon &&
                                                    <span className={style.barIcon} style={{
                                                        left: `20px`
                                                    }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 32">
                                                    <path d="M4 16c0-6.6 5.4-12 12-12s12 5.4 12 12c0 1.2-0.8 2-2 2s-2-0.8-2-2c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8c1.2 0 2 0.8 2 2s-0.8 2-2 2c-6.6 0-12-5.4-12-12z" />
                                                </svg>
                                            </span> )}

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="controller-timer">
                                <span className="pt">{this.state.curTime}</span>
                                /
                                <span className="tt">{this.state.totalTime}</span>
                            </div>
                            <div className="controller-customized">
                                <div className="controller-audio" />
                                <div className="controller-lrc" />
                                <div className="controller-playlist">
                                    {
                                        (this.state.playMode === 1)  &&
                                        <div className={style.button} onClick={() => this.switchMode(2)}>
                                            <svg viewBox="0 0 40 40" id="while">
                                                <path d="M20.539,37.912c-9.51,0-17.247-7.737-17.247-17.247S11.136,3.418,20.646,3.418S38,11.155,38,20.665V22h-3v-1.335   c0-7.855-6.498-14.247-14.354-14.247s-14.3,6.391-14.3,14.247s6.364,14.247,14.22,14.247c4.594,0,8.806-2.178,11.467-5.804   l-8.014-0.88l0.324-2.982l12.533,1.378l-1.002,1.94C32.899,34.33,27.022,37.912,20.539,37.912z" />
                                            </svg>
                                        </div>
                                    }
                                    {
                                        (this.state.playMode === 2)  &&
                                        <div className={style.button} onClick={() => this.switchMode(3)}>
                                            <svg viewBox="0 0 40 40" id="rand">
                                                <path d="M34.423,30c-10.673,0-12.231-4.356-13.776-9.567C22.192,15.233,23.75,11,34.423,11h3.621l-8.532-8.707L27.413,4.26   l3.641,3.599c-7.433,0.765-10.345,4.074-11.981,7.838C17.318,11.566,14.065,7.998,5,7.998v3c9.82,0,10.944,4.11,12.492,9.367   c-1.549,5.258-2.673,9.37-12.492,9.37v3c9.095,0,12.339-3.515,14.09-7.626c1.617,3.732,4.495,7,11.878,7.76l-3.598,3.593   l2.121,2.111L38.044,30H34.423z" />
                                            </svg>
                                        </div>
                                    }
                                    {
                                        (this.state.playMode === 3)  &&
                                        <div className={style.button}  onClick={() => this.switchMode(1)}>
                                            <svg viewBox="0 0 40 40" id="one">
                                                <path d="M20.578,37.987V15.603l-5.645,3.883l-1.7-2.472l10.345-7.117v24.731c6.519-1.326,11.415-7.169,11.415-13.964   c0-7.855-6.391-14.247-14.247-14.247S6.5,12.81,6.5,20.665c0,6.808,4.842,12.689,11.513,13.985l-0.572,2.945   C9.363,36.026,3.5,28.906,3.5,20.665c0-9.51,7.737-17.247,17.247-17.247s17.247,7.737,17.247,17.247   c0,8.896-6.936,16.444-15.79,17.186L20.578,37.987z" />
                                            </svg>
                                        </div>
                                    }
                                    <div className={style.button}>
                                        <svg viewBox="0 0 40 40" id="list">
                                            <rect x="12.5" y="10" width="20" height="4" />
                                            <path d="M11.5,12c0,1.104-0.896,2-2,2H9.5c-1.104,0-2-0.896-2-2l0,0c0-1.105,0.895-2,2-2H9.5C10.604,10,11.5,10.895,11.5,12L11.5,12  z"/>
                                            <rect x="12.5" y="18" width="20" height="4"/>
                                            <path d="M11.5,20c0,1.104-0.896,2-2,2H9.5c-1.104,0-2-0.896-2-2l0,0c0-1.105,0.895-2,2-2H9.5C10.604,18,11.5,18.895,11.5,20L11.5,20  z"/>
                                            <rect x="12.5" y="26" width="20" height="4"/>
                                            <path d="M11.5,28c0,1.104-0.896,2-2,2H9.5c-1.104,0-2-0.896-2-2l0,0c0-1.105,0.895-2,2-2H9.5C10.604,26,11.5,26.895,11.5,28L11.5,28  z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: '<!--Playerlist-->' }} />
                        <PlayerList listData={this.props.model.playerData} onRef={this.setList} />
                    </div>
                </div>

            </>
        );
    }
}