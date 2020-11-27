import React, {Component} from 'react';
import style from './style.less';
import controller from "@symph/joy/controller";
import {autowire} from "@symph/joy/autowire";
import MusicModel from "../../models/music";
import NekoModel from "../../models/model";

@controller((state) => {// state is store's state
	return {
		model: state.nekomusic, // bind model's state to props
		eves: state.muse,
	}
})
export default class PlayerList extends Component {

	@autowire()
	nekoModel: NekoModel;
	@autowire()
	muse: MusicModel;

	ref = null;

	setRef = (dom) => this.ref = dom;

	state = {
		eventObj: {},
		currentList: {},
	}

	async componentPrepare() {
		await this.muse.registerPlaylist();
		let amiEvent = this.muse.fetchAmiEvent();
		this.setState({
			eventObj: amiEvent,
		})
		amiEvent.listen("plist_change", (e) => {
			console.log(e);
		})
	}

	/*const currentMusic = this.state.playerList.filter(item => item.hashId === currentHash);
        this.refAudio.setAttribute("src", currentMusic[0].url);
        this.refAudio.play();
        console.log(this.refAudio);

        window.PEO.trigger("plist_change");
        window.PEO.trigger("lrc_onload", currentMusic[0].name).then(() => {
            console.log(currentHash, currentMusic[0], 'trigger end');
        });*/

	/*

	constructor(props) {
		super(props);
		// hide or show the playlist
		/!*window.PEO.listen('plist_toggle', async (listItem) => {
			return new Promise(resolve => {
				setTimeout(() => {
					console.log(listItem, 'listItem');
					resolve('resolved');
				}, 2000);
			});
		});*!/
		window.PEO.listen('plist_add', async (data) => {
			return new Promise(resolve => {
				this.setState({
					currentList: data,
				});
				resolve('resolved');
			});
		});
		window.PEO.listen('plist_change', async () => {
			return new Promise(resolve => {
				console.log(this.state.currentList);
				resolve('resolved');
			});
		});
	}*/

	/*setCurrentItem =  (item) => {
		this.setState({
			currentList: item
		});
	}*/

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
		url:
	*
	*
	* */

	clickToMe = (event) => {
		event.stopPropagation();
		// console.log(event.target, event.target.className, this.ref);
		// event.target.style.display = "block";
		const currentHash = event.target.dataset.hash;

		let pkpk =this.ref.querySelectorAll("li");
		for (let i=0;i<pkpk.length;i++)
		{
			if (pkpk[i].dataset.hash === currentHash) {
				this.state.eventObj.trigger("plist_change", currentHash);
				pkpk[i].querySelectorAll("span")[0].style.display = "block";
				continue;
			}
			pkpk[i].querySelectorAll("span")[0].style.display = "none";
		}
		// this.props.trigger(currentHash);
		// document.querySelectorAll("span")[0].style.display = "block";
	}

	render() {
		const listData = this.props.listData;
		return (
			<div style={{background: "#000"}}>
				<ol className={style.container} ref={this.setRef}>
					{
						listData && listData.map(
							(listitem, itx) =>{
								let {album,
									artist,
									name,
									fileId,
									src,
									cover} = listitem;
								return (
									<li key={fileId} onClick={this.clickToMe} data-hash={fileId}>
										<span className={style.cur} data-hash={fileId} />
										<span className={style.itx} data-hash={fileId}>{itx+1}</span>
										<span className="title" data-hash={fileId}>{name}</span>
										<span className={style.artist} data-hash={fileId}>{artist}</span>
									</li>
								);
							}
						)
					}
				</ol>

			</div>
		);
	}
}
