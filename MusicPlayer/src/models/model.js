import model from '@symph/joy/model';
import config from "../connect/config";
import {SourceController} from '../services/playlist';
import React from "react";
import produce, {createDraft, finishDraft, enableMapSet} from "immer";

@model("elephant")
export default class AppModel {
    namespace = 'nekomusic';
    initState = {
        status: {},
        user: '',
        ip: '',
        token: '',
        loading: false,
        playerlist: {},
        playerData: [],
    };

    async fetchMusic({mtype}) {
        let initStat = this.getState();
        this.setState({
            loading: true,
        });
        let {data} = await SourceController("playerlist", {
            fileType: mtype
        })
        const _imuData = await produce(data, draft => {
            draft.forEach((item, index) => {
                let nm = decodeURIComponent(item.fileName).split("."+item.filetype)[0].trim();
                let rp = decodeURIComponent(item.relativePath).split('/');
                let rootUrl = item["FileNo"]<2073?config.oldFileRootUrl:config.fileRootUrl;
                item.name = nm + (item.filetype !== "flac" ? "" : " [HQ]");
                item.artist = config.artist[rp[rp.length-3]] || rp[rp.length-3];
                item.album = rp[rp.length-2];
                item.url = rootUrl + decodeURIComponent(item.src);
                item.cover = rootUrl + decodeURIComponent(item.relativePath) + "cover.jpg";
                item.lrc = null;
                delete item.relativePath;
                delete item.src;
                delete item.fileName;
                delete item.hashId;
            })
        });
        this.setState({
            playerData: [...initStat.playerData, ..._imuData],
            loading: false,
        })
    }
}