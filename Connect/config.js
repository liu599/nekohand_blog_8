export default {
    rootUrl: 'https://kasumi.ecs32.top',
    fileRootUrl: 'https://file.ecs32.top/data',
    oldFileRootUrl: 'https://file.ecs32.top/data/music',
    playerlist: ["https://mltd.ecs32.top/filelist", "FORM", "POST"],
    audio: ["https://mltd.ecs32.top/ecs-music", "FORM", "POST"],
    audioInfo: ["https://mltd.ecs32.top/ecs-music", "FORM", "POST"],
    searchInfo: ["https://api.mlwei.com/music/api/wy/?key=523077333&type=lrc&cache=1", "FORM", "GET", "w"],
    createInfo: ["https://mltd.ecs32.top/ecs-music-create", "FORM", "POST"],
    nekohandBlog: {
        posts: ["https://kasumi.ecs32.top/api/nekohand/v2/frontend/posts", "FORM", "POST"],
        post: ["https://kasumi.ecs32.top/api/nekohand/v2/frontend/post", "FORM", "POST"],
        postByCategory: ["https://kasumi.ecs32.top/api/nekohand/v2/frontend/categories", "FORM", "GET", "w"],
        postTime: ["https://kasumi.ecs32.top/api/nekohand/v2/frontend/po/t", "FORM", "POST"]
    },
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
}