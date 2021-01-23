export default {
    rootUrl: 'https://kasumi.ecs32.top',
    fileRootUrl: 'https://file.ecs32.top/data',
    ossRootUrl: 'https://oss-aimi.ecs32.top',
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
        postTime: ["https://kasumi.ecs32.top/api/nekohand/v2/frontend/po/t", "FORM", "POST"],
        postChronology: ["https://kasumi.ecs32.top/api/nekohand/v2/frontend/posts-chronology", "FORM", "GET", "w"],
        aimiPic: ["https://mltd.ecs32.top/tag.filelist", "FORM", "POST"],
        aimiPicTags: ["https://mltd.ecs32.top/tags.get", "FORM", "GET", "w"],
        friends: ["https://api.ecs32.top/service/friends", "FORM", "GET", "w"],
        favorites: ["https://api.ecs32.top/service/favorites", "FORM", "GET", "w"],
        rootUrl: 'https://kasumi.ecs32.top',
        fileUrl: 'https://mltd.ecs32.top',
        filemodules: {
            upload: 'upload',
            nekofile: 'nekofile'
        },
        relativePath: '/api/nekohand/v2/',
        frontend: 'frontend',
        backend: 'backend',
        modules: {
            frontend: {
                categories: 'categories',
                status: 'status',
                post: 'post',
                posts: 'posts',
                postByTime: 'po/t',
                postChronology: 'posts-chronology',
                comments: 'comments',
                commentCreation: 'c2a5cc3b070',
                filelist: 'filelist',
            },
            backend: {
                token: 'token.v2.get',
                postEdit: 'auth/post.edit',
                postDelete: 'auth/post.delete',
                categoryEdit: 'auth/category.edit',
                categoryDelete: 'auth/category.delete',
            },
            others: {
                friends: ["https://api.ecs32.top/service/friends", "FORM", "GET", "w"],
                favorites: ["https://api.ecs32.top/service/favorites", "FORM", "GET", "w"],
            },
            genUrl: function (module, name) {
                return `${this.nekohandBlog.rootUrl}${this.nekohandBlog.relativePath}${module}/${name}`
            },
            genFileUrl: function(module, name) {
                return `${this.nekohandBlog.fileUrl}/${module}/${name}`
            }
        },
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