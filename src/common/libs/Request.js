import umiRequest from 'umi-request';
import produce from "immer";
import Cache from "./Cache";

class Request {
	constructor() {
		this.cache = new Cache();

		this._errorHandler = function(error) {
			const codeMap = {
				'10001': "歌词服务器没有找到匹配的歌词",
				// ....
			};
			let code = '10001';
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				// console.log(error.response.status);
				// console.log(error.response.headers);
				code = error.data.split(" ")[1].substr(0, 5);
				console.log(error.data, code);
				// console.log(error.request);
				// console.log(codeMap[error.data.status])
				// console.log(codeMap[code])
			} else {
				// The request was made but no response was received or error occurs when setting up the request.
				console.log(error.message);
			}


			// throw error; // If throw. The error will continue to be thrown.
			return Promise.resolve({
				data: {
					lrc: `[00:00.00]${codeMap[code]}`,
				}
			});
		};
	}

	_regCache(url) {
		//TODO: FINDOUT A WAY TO AVIOD REQUEST
		const ct1 = new Date().getFullYear();
		const ct2 = new Date().getMonth();
		const ct3 = new Date().getDay();
		const ct = `${ct1}${ct2}${ct3}`;
		const mark = {
			url: url[0],
			ct,
		};
		const keyValue = "AIMI_PLAYER_"+ct;
		this.cache.set(keyValue, JSON.stringify(mark));
	}

	_searchCache(url) {
		let prpk = Object.keys(this.cache.storage);
		for(let i =0; i<prpk.length; i+=1) {
			if (!prpk[i].includes("AIMI_PLAYER")) {
				continue;
			}
			console.log(prpk[i].split("AIMI_PLAYER_"));
		}
		return false;
	}

	_request (url, data) {
		if (Object.prototype.toString.call(url) !== '[object Array]') {
			console.error("lost url Array to request");
			return;
		}
		if (this._searchCache(url)) {
			return;
		}
		this._regCache(url);
		if (url.length === 3) {
			url.concat({});
		} else {
			url[3] = data;
		}
		return umiRequest(url[0], {
			requestType: url[1].toLowerCase(),
			method: url[2].toLowerCase(),
			params: url[3],
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			errorHandler: this._errorHandler,
			data,
		});
	}
}

export default Request;
