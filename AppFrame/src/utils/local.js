export const localforage = require("localforage");
const NEKOHAND = "nekohand";
const EXPIRE = 3600000 * 24 * 30; // 30 day
localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: NEKOHAND
});

function ForageCreation() {
  console.log("init forage object")
  return localforage.setItem(NEKOHAND, {
    expiredAt: Date.now() + EXPIRE,
    userData: {},
    default: [],
    list1: [],
    list2: [],
    list3: [],
    albums: [],
    artists: [],
    storage: [],
  });
}

export function ForageInit() {
  localforage.getItem(NEKOHAND).then(function(value) {
    // 当离线仓库中的值被载入时，此处代码运行
    if (value === null || value.expiredAt < Date.now()) {
      console.log("[INFO] You local data had been expired.")
      ForageCreation().then(r => r);
    }
  }).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
    throw new Error(err);
  });
}

export function GetItemService() {
  return localforage.getItem(NEKOHAND).then(r => r);
}

export function addDefaultListService({FileNo}) {
  return localforage.getItem(NEKOHAND).then((p) => {
    p.default.push(FileNo)
    return localforage.setItem(NEKOHAND, p).then(r => r);
  });
}

export function deleteDefaultListService({FileNo}) {
  return localforage.getItem(NEKOHAND).then((p) => {
    p.default.splice(p.default.findIndex(item => item === FileNo), 1)
    return localforage.setItem(NEKOHAND, p).then(r => r);
  });
}

export function updateService(data) {
  localforage.getItem(NEKOHAND).then((res)=>{
    console.log("[INFO] Save local data", data, res);
    if (res.expiredAt < Date.now()) {
      return res;
    }
    return localforage.setItem(NEKOHAND, Object.assign({}, res, data)).then(r => r);
  })
}
