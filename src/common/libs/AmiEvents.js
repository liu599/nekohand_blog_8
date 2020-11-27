class AmiEvents {
	constructor() {
		this.events = {};
		this.eventMap = {
			ado: 'audioEvents',
			ami: 'globalEvents',
			plugin: {},
		};
		this.audioEvents = [
			'canplay',
			'canplaythrough',
			'pause',
			'play',
			'waiting'
		];
		this.gobalEvents = [
			'warning',
			'error',
			'info',
			'registerPlugin',
			'unregisterPlugin',
		];
		this.pluginEvents = {};
	}
	/*
	* Event Tag
	* */
	getTag(nm) {
		if (!nm.includes('_')) {
			return undefined;
		}
		return nm.split('_')[0];
	}
	/*
	* QuickSearch
	*
	*
	* */
	qs(nm) {
		// console.log('qs', nm);
		if (this.gobalEvents.includes(nm) || this.audioEvents.includes(nm)) {
			// console.log('already included');
			return true;
		}
		let mainKeys = Object.keys(this.eventMap.plugin);
		// console.log('qs', mainKeys, this.getTag(nm),this.getTag(nm) === mainKeys[0]);
		let bKey;
		for (let i = 0; i < mainKeys.length; i+=1) {
			if (this.getTag(nm) === mainKeys[i]) {
				// console.log(this.eventMap.plugin[mainKeys[i]], 'find');
				bKey = this.eventMap.plugin[mainKeys[i]];
				break;
			}
		}
		if (!this.pluginEvents[bKey]) {
			console.error(Object.assign({}, this.pluginEvents))
			console.error("The value of 'k' in the plugin event Entry Instance" +
				" should be the same as events prefix");
			return undefined;
		}
		return !!this.pluginEvents[bKey].includes(nm);

	}
	/*
	*
	* Listen
	*
	* */
	listen(nm, cb) {
		if(this.qs(nm) && typeof cb === 'function') {
			if (!this.events[nm]) {
				this.events[nm] = [];
			}
			this.events[nm].push(cb);
			return null;
		}
		console.error("EVENT LISTENING FAILURE!!!!:  " + nm);
	}
	/*Remove Listen*/
	RemoveListen(nm) {
		if (!this.isListen(nm)) {
			return null;
		}
		delete this.events[nm];
	}

	/*
	* Register Event
	* pluginEventEntryInstance: name, k, v, events
	*
	* */
	register(pluginEventEntryInstance) {
		if (!pluginEventEntryInstance.hasOwnProperty('k') || !pluginEventEntryInstance.hasOwnProperty('v')) {
			console.error("EVENT ERROR: Unvalid pluginEventEntry Instance, should have a k and v");
			return undefined;
		}
		this.eventMap.plugin[pluginEventEntryInstance.k] = pluginEventEntryInstance.v;
		if (this.pluginEvents.hasOwnProperty(pluginEventEntryInstance.v)) {
			console.warn("EVENT CONFLICT: The new plugin may override the old events");
		} else {
			this.pluginEvents[pluginEventEntryInstance.v] = [];
		}
		this.pluginEvents[pluginEventEntryInstance.v] = [
			...pluginEventEntryInstance.events
		];
		console.log("EVENT REGISTER: Successfully register the Event of " + pluginEventEntryInstance.name);
	}
	/*
	* Unregister Events
	*
	*
	* */
	unregister(pluginEventEntryInstance) {
		if (this.eventMap.hasOwnProperty(pluginEventEntryInstance.k)) {
			delete(this.eventMap[pluginEventEntryInstance.k]);
		}
		if (this.eventMap.plugin.hasOwnProperty(pluginEventEntryInstance.k)) {
			delete(this.eventMap.plugin[pluginEventEntryInstance.k]);
		}
		delete(this.pluginEvents[pluginEventEntryInstance.v]);
		console.log("EVENT UNREGISTER: Successfully unregister the Event of " + pluginEventEntryInstance.name);
	}
	/*
	* IsListened
	*
	* */
	isListen(nm) {
		return Object.keys(this.events).includes(nm);
	}
	/*
	*  trigger async or sync
	*
	* */
	timeInterval = 300;
	qTimer = null;
	async trigger(nm, instance) {
		if (this.qTimer === null) {
			this.qTimer = setTimeout(() => {
				this.qTimer = null;
				clearTimeout(this.qTimer);
			}, this.timeInterval)
		} else {
			console.log(this.qTimer, "interface");
			return
		}
		if (!this.isListen(nm)) {
			console.error("EVENT ERROR: The event is not listened");
			return null;
		}
		if (this.events[nm] && this.events[nm].length) {
			for (let i=0; i<this.events[nm].length; i+=1) {
				await this.events[nm][i](instance);
			}
		}
	}
}

export default AmiEvents;
