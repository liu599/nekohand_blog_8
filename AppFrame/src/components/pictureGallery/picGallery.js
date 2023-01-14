import React, {useEffect, useState} from "react";
import produce from 'immer';
import styles from "./picGallery.less";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from "@material-ui/core/Typography";

import {
  Link,
} from 'umi';

const useStyles = makeStyles((theme) => ({
  loading: {
    marginTop: -200,
    display: 'flex',
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    background: "transparent",
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  desc: {
    position: "absolute",
    bottom: 0,
    color: "#fff",
    background: "rgba(0,0,0,0.5)",
    left: 0,
    width: 200,
    lineHeight: 1.8,
    padding: theme.spacing(1),
  }
}));

/**
 * Given a DOM element, searches it for <img> tags and checks if all of them
 * have finished loading or not.
 * @param  {Element} parentNode
 * @return {Boolean}
 */
function imagesLoaded(parentNode) {
  if (parentNode===null) {
    return false;
  }
  const imgElements = [...parentNode.querySelectorAll("img")];
  for (let i = 0; i < imgElements.length; i += 1) {
    const img = imgElements[i];
    // console.log(img.dataset, i, "image loading judge");
    if (!img.dataset.hasOwnProperty("finish")) {
      return false;
    }
  }
  console.log("all Images has been loaded");
  return true;
}

const picGallery = (props) => {

    let [tmpElem, setTmpElem] = useState(undefined);
    const [imageLoading, setImageLoading] = useState(false);
    const [imageLength, setImageLength] = useState(0);
    const [imageLoadingCurrentPoint, setImageLoadingCurrentPoint] =  useState(0);
    const [imageLoadingTime, setImageLoadingTime] = useState(0);
    const [imageLoadingSliceLength, setImageLoadingSliceLength] = useState(4);
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
      const {info} = props;
      setImageData([
        ...produce(info, draft => {
          for(let i=info.length-1; i>imageLoadingSliceLength; i-=1){
            draft[i].DeletedAt = true;
          }
        }),
      ]);
      setImageLength(info.length);
      /*
      * When you return a function from useEffect, that function will
      * be executed when the component unmounts.
      * So taking advantage of that, you set your state to an empty.
      * Doing this, whenever you leave that screen or the component unmounts, the state will be empty,
      * so the components of your screen won't be trying to re-render again. I hope this helps
      *
      *
      *
      * */
      return () => {
        setImageData([]);
        setImageLength(0);
      }
    }, [])

    const handleImgLoading = () => {

      // 如果已加载等于图片总长度， 结束加载
      if (imageLoadingCurrentPoint === imageLength - 1) {
        setImageLoading(!imagesLoaded(tmpElem))
        console.log("加载完毕");
        return null;
      }
      // 一个加载周期内。
      if (imageLoadingCurrentPoint >= imageLoadingTime*imageLoadingSliceLength
        && imageLoadingCurrentPoint < (imageLoadingTime+1)*imageLoadingSliceLength) {
        setImageLoadingCurrentPoint(imageLoadingCurrentPoint+1);
        // console.log("一个加载周期内", imageLoadingCurrentPoint);
        if (imageLoadingCurrentPoint ===
          (imageLoadingTime+1)*imageLoadingSliceLength - 1 && imageLoadingCurrentPoint < imageLength) {
          // console.log(imageLoadingCurrentPoint);
          setImageLoadingTime(imageLoadingTime+1);
          setImageData([
            ...produce(imageData, draft => {
              for(let i=(imageLoadingSliceLength)*(imageLoadingTime+1)-1;
                  i<(imageLoadingSliceLength)*(imageLoadingTime+2) && i<imageLength; i+=1){
                draft[i].DeletedAt = false;
              }
            }),
          ]);
          console.log(`正在加载第${imageLoadingCurrentPoint}/${imageLength}个图片...`);
        }
        return null;
      }

      return null;
    };

    const classes = useStyles();
    const renderImage = (imageInfo) => {
      const {fileId, width, height, DeletedAt, src, name} = imageInfo;
      // console.log(fileId, width, height, DeletedAt, name);
      const imageUrl = src;
      return (
        <div className={styles.thumbnail} key={fileId}>
          <div className={styles.thumbGroup}>
              <Link to={name ? {
                pathname: "/zo/zo",
                query: {
                  alb: 1,
                  search: name,
                }
              } : {pathname: imageUrl}} target={!name && "_blank"} replace={!name}>
                <>

                  {DeletedAt === true
                    ? null
                    :
                    <img src={imageUrl}
                         alt={fileId}
                         title={name}
                         className={styles.thumbnailImg}
                         ref={(thisNode) => {
                           // console.log("loading", imageUrl);
                           // onLoad replacement for SSR
                           if (!thisNode) { return; }
                           //  Acquire
                           thisNode.onerror = () => {
                             console.log("error in loading",imageUrl);
                             // 删去加载符
                             thisNode.parentNode.querySelector("div").remove();
                             thisNode.parentNode.querySelector("img").remove();
                           };
                           // if (img.complete) {
                           //     updateFunc();
                           // }
                           // Loading
                           thisNode.onload = () => {
                             // console.log("loaded", imageUrl);
                             // 删去加载符
                             thisNode.parentNode.querySelector("div").remove();
                             // 增加一个FinishTag
                             thisNode.setAttribute("data-finish", "1");
                             handleImgLoading();
                           };
                         }}
                         style={{marginLeft: width>height?-width*0.25:0, width: width, height: height}}
                         onError={handleImgLoading}
                    />
                  }
                  <div className={classes.loading}>
                    <CircularProgress color={"secondary"} fontSize={"large"} />
                  </div>
                </>
              </Link>
            </div>
            {name &&
               <Typography variant="caption" className={classes.desc}>
                 {name}
               </Typography>
            }
        </div>
      );
    }

    if (imageData.length < 1) {
      return <div>Error loading pictures.</div>
    }


    return (
      <div ref={element => {setTmpElem(element);}}>
        <div className={styles.container}>
          {imageData && imageData.map(imageInfo => renderImage(imageInfo))}
        </div>
      </div>
    );
}

export default picGallery;
