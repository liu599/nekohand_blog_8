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
            加载Artist情报中...
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
