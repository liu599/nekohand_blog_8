import React, {Component} from 'react';
import Head from '@symph/joy/head';
import {Link} from '@symph/joy/router';
import NekoModel from '../../models/model';
import controller from '@symph/joy/controller';
import {autowire} from '@symph/joy/autowire';
import articleStyles from '../../common/styles/article/articlelist.less';
import Loading from '../../components/loading';


// @requireModel(NekoModel)          // register model
@controller((state) => {              // state is store's state
    return {
        model: state.nekoblog, // bind model's state to props
    }
})

export default class Player extends Component {

    @autowire()
    nekoModel: NekoModel

    data = {
        artist: {
            "A_PPP": "Poppin'Party",
            "G_Cover": "BanG Dream! Girls Band Party Cover Songs",
            "F_Roselia": "Roselia",
            "H_RAS": "RAISE A SUILEN",
            "I_Spec": "Collaboration",
            "B_Char": "BanG Dream! Character Song",
            "E_PP":"Pastel*Palettes",
            "InoriMinase": "水濑祈",
        },
        urls: {
            playerlist: ["https://mltd.ecs32.top/filelist", "FORM", "POST"],
            audio: ["https://mltd.ecs32.top/ecs-music", "FORM", "POST"],
            audioInfo: ["https://mltd.ecs32.top/ecs-music", "FORM", "POST"],
            searchInfo: ["https://api.mlwei.com/music/api/wy/", "FORM", "GET", "w"],
            createInfo: ["https://mltd.ecs32.top/ecs-music-create", "FORM", "POST"]
        },
        playerList: [],
    };

    // path = '';
    //
    async componentPrepare() {
        let {dispatch} = this.props;
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
        /*window.G_REQ._request(this.state.urls.playerlist, {
            fileType: "mp3"
        }).then(({data}) => {
            const newData = produce(data, draft => {
                draft.forEach((item, index) => {
                    let nm = decodeURIComponent(item.fileName).match(/^\d+\.(.+)\.mp3$/)[1].trim();
                    let rp = decodeURIComponent(item.relativePath).split('/');
                    let rootUrl = item["FileNo"]<2073?"https://file.ecs32.top/data/music":"https://file.ecs32.top/data";
                    item.name = nm;
                    item.artist = this.state.artist[rp[rp.length-3]] || rp[rp.length-3];
                    item.album = rp[rp.length-2];
                    item.url = rootUrl + data[index].src;
                    item.cover = rootUrl + data[index].relativePath + "cover.jpg";
                    item.lrc = null;
                });
            });
            console.log(newData, "newData");
            this.setState({
                playerList: newData
            });
            window.PEO.trigger("plist_add", newData);
        });*/
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

        if (this.props.model.loading) {
            return (
                <Loading.Loading />
            )
        }

        return (
            <>
                <Head>
                    <title>Nekohand Blog </title>
                </Head>
                <div>
                    <h2>AIMI PLAYER</h2>
                    <audio preload="auto"
                           src="https://file.ecs32.top/data%2Fmusic%2FArtist%2FInoriMinase%2F%5B2018.05.23%5DBLUE%20COMPASS%2F5f262ddf58adfe365b342874__06.%20%E3%82%A2%E3%82%A4%E3%83%9E%E3%82%A4%E3%83%A2%E3%82%B3.flac">
                        Your browser not supported
                    </audio>
                </div>
            </>
        );
    }
}