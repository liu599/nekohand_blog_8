import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LyricArea from './lyric';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FormalTabs(props) {
  const [value, setValue] = React.useState(0);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        variant="fullWidth"
        aria-label="disabled tabs example"
      >
        {props.album && <Tab label="アルバム情報" {...a11yProps(2)}/>}
        {props.album && <Tab label="Zo アルバム" {...a11yProps(1)}/>}
        {props.artist && <Tab label="アーティスト情報" {...a11yProps(0)}/>}
        {props.artist && <Tab label="Zo アーティスト" {...a11yProps(1)}/>}
      </Tabs>
      {props.artist ? <TabPanel value={value} index={0} style={{overflowY: "auto", maxHeight:450}}>
          <Typography variant="body1" gutterBottom paragraph>
            ソニー・ミュージックアーティスツ主催のオーディション「アニストテレス」に参加し、第1回目のグランプリを受賞（当時中学生）。その後2010年TVアニメ「世紀末オカルト学院」にて声優デビューを果たす。
            NHK連続テレビ小説「あまちゃん」に登場するアイドルグループ「アメ横女学園芸能コース」の成田りな役で女優に挑戦するなど、マルチに活躍の場を広げる中、2013年に出演したTVアニメ「恋愛ラボ」をきっかけに演技力の高さや役幅の広さが高く評価されるようになり、声優として加速度的な成長を遂げ、10代にして話題作のメインヒロイン役に次々と抜擢されるようになる。
            2015年9月には、大ヒットアニメ「あの日見た花の名前を僕達はまだ知らない。」のスタッフが再集結したことでも話題となった劇場版アニメ「心が叫びたがってるんだ。」の主人公・成瀬順役の声優を務め、テレビや雑誌など多くのメディアで注目を集めた。2016年3月には声優アワード・主演女優賞を受賞。
            また、これまで歌ってきたキャラクターソングやアニメ・ゲームイベントでのパフォーマンスで、ジャンルを選ばずあらゆる楽曲を歌いこなす歌唱力が多くのアニメ・声優ファンを魅了し、歌手としての活動にも大きな期待が寄せられていた。
            2015年12月2日、二十歳の誕生日をむかえる記念すべき日に、待望の歌手デビューを果たした。
            ◆主な出演作品（声優）◆
            ・世紀末オカルト学院 岡本あかり 役（デビュー作品）
            ・恋愛ラボ 棚橋鈴音 役
            ・ご注文はうさぎですか? チノ 役
            ・天体のメソッド ノエル 役
            ・ダンジョンに出会いを求めるのは間違っているだろうか ヘスティア 役
            ・がっこうぐらし! 丈槍由紀 役
            ・戦姫絶唱シンフォギアＧＸ キャロル・マールス・ディーンハイム 役
            ・うたわれるもの 偽りの仮面 ネコネ 役
            ・心が叫びたがってるんだ。 成瀬順 役（劇場アニメ）
          </Typography>
        </TabPanel>
        : <TabPanel value={value} index={0} style={{overflowY: "auto", maxHeight:450}}>
          <Typography variant="body1" gutterBottom paragraph>
            加载Album情报中...
          </Typography>
        </TabPanel>}

      <TabPanel value={value} index={1} style={{overflowY: "auto", maxHeight:450}}>
        <LyricArea />
      </TabPanel>

    </>


  );
}
