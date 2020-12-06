class Cache {
	constructor() {
		this.storage = localStorage;
	}

	set(key, value) {
		localStorage.setItem(key, value);
	}

	get(key) {
		return localStorage.getItem(key);
	}
}

export default Cache;
