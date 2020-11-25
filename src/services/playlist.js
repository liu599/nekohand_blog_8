import {FetchSources} from '../connect/request';
import config from "../connect/config";

const srcBaseUrl = config.rootUrl;
const optionFilter = (obj, key) => {
    if (obj.hasOwnProperty(key)) {
        return obj[key]
    }
}

export async function SourceController(sourceType, queryData) {
    const configObj = optionFilter(config, sourceType);
    // console.log(configObj, "config");
    const option = {
        requestType: configObj[1],
        method: configObj[2],
        data: queryData,
    }
    return FetchSources(configObj[0], option);
}