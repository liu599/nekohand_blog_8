(function(doc){
    let imgUrl = "data:image/png;base64,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"
    // var rightColumn = doc.querySelector('._310Sv');
    // // console.log(rightColumn);
    // var divColumn = doc.createElement('div');
    // divColumn.className='_4Uxcd';
    // divColumn.innerHTML='<div class="_1_BSO"><h2>我的关注</h2></div>';
    // rightColumn.appendChild(divColumn);

    // imgUrls = [
    //     '/promote/201902/img_post_1-624x372.png',
    //     '/promote/201902/df562af0-e7e1-4b3d-891f-e03b0c14b963.jpg',
    //     '/promote/201902/fc4b8947-ef9d-49d6-96be-4e9d0e910c5e.jpg',
    //     '/promote/disc/VocalAlbum2.png',
    //     '/promote/disc/13th_Jumpin.jpg',
    //     '/promote/disc/1stAlbum_Poppin_On.png',
    //     '/promote/disc/BanGDream_TV.jpg'
    // ];
    // var imgElement;
    // var linkElment;
    // for(var i=0; i<imgUrls.length; i+=1) {
    //     linkElment = document.createElement('a');
    //     linkElment.href='https://bang-dream.com/';
    //     imgElement = document.createElement('img');
    //     imgElement.className = 'lazy';
    //     imgElement.src = imgUrls[i];
    //     imgElement.style.width = '100%';
    //     imgElement.style.marginBottom = '8px';
    //     linkElment.appendChild(imgElement);
    //     rightColumn.appendChild(linkElment);

    // }
    // document.querySelector('#__joy').style.backgroundColor = 'rgb(237, 237, 237)';
    // document.querySelector('#root').style.backgroundImage = 'url(/promote/background/live-event-title-bg.png)';
    console.log('External Script Loaded.');

    setTimeout(function() {
        // doc.querySelector('nav._29178').style.display = 'none';
        doc.body.style.backgroundImage = "url("+imgUrl+")";
        let upElement = doc.createElement('div');
        let imgElement = doc.createElement('img');
        imgElement.src = "https://blog.ecs32.top/static/btn_back-to-top.png";
        imgElement.style.cssText = 'width: 72px; height: 72px; :hover{opacity: 0.5;}';
        doc.body.appendChild(upElement);
        upElement.id = "poppinpartytop";
        upElement.className = "poppin-party-up";
        //console.log(upElement);
        //console.log(upElement.style);
        upElement.appendChild(imgElement);
        upElement.style.cssText = 'height: 110px; width: 110px; background: transparent; right: 15px; bottom: 15px; position: fixed; z-index: 110; cursor: pointer ';
        upElement.onclick = function(){

            document.body.scrollTop = document.documentElement.scrollTop = 0
        };
    }, 450);
})(document);
