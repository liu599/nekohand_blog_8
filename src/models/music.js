import AmiEvents from "../common/libs/AmiEvents";
import model from '@symph/joy/model';

@model("ant")
export default class MusicModel {
    namespace = 'muse';
    initState = {
        amiEvent: new AmiEvents(),
    }

    fetchAmiEvent() {
        let initState = this.getState();
        return initState.amiEvent;
    }

    async registerPlaylist() {
        console.log("register playlist");
        let initStat = this.getState();
        let listEventEntryInstance =  {
            name: 'playlist',
            k: 'plist',
            v: 'playlistEvents',
            events: [
                'plist_show',
                'plist_hide',
                'plist_toggle',
                'plist_add',
                'plist_remove',
                'plist_change',
            ]
        };

        initStat.amiEvent.register(listEventEntryInstance);
        console.log(initStat, "iini-te");
    }
}
