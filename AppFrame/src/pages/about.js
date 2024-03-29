import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 64,
  },
});

export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom paragraph>
        Status
      </Typography>
      <Typography variant="body1" gutterBottom paragraph>
        Start from 2021.01.03, Nekohand Blog upgrade to Version 8,with a front-end with Material-ui, Umijs based on Reactjs.
        Back-end with Go.
      </Typography>
      <Typography variant="h6" gutterBottom paragraph>
        Contact
      </Typography>
      <Typography variant="body1" gutterBottom paragraph>
        Reach me via weibo.
      </Typography>
      <Typography variant="h6" gutterBottom paragraph>
        GPL-3.0 License
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Copyright 2021-2023 Tokei {"."}
      </Typography>
      {/*<Typography variant="subtitle2" gutterBottom>*/}
      {/*  subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur*/}
      {/*</Typography>*/}
      <Typography variant="body1" gutterBottom paragraph>
        Nekohand 公式サイト
        Copyright (C) 2021-2023 Nekohand 公式サイト委員會/EC小站
      </Typography>
      <Typography variant="body1" gutterBottom paragraph>
        This program is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.
      </Typography>
      <Typography variant="body1" gutterBottom paragraph>
        This program is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.
      </Typography>
      <Typography variant="body1" gutterBottom paragraph>
        You should have received a copy of the GNU General Public License
        along with this program.  If not, see http://www.gnu.org/licenses.
      </Typography>
      <Typography variant="h6" gutterBottom paragraph>
        History
      </Typography>
      <Typography component={"pre"} paragraph>
        {`
        - Wordpress
        2014.09.28 Version 1.0 Scarlet
        2015.01.21 Version 2.0 Scarlet Gai 2
        2015.03.20 Version 3.0 Scarlet Gai 3
        2015.06.20 Version 4.0 White Day

        - Jekyll Static
        2017.02.12 Version 5.0 Nekohand's Jekyll Blog

        - ReactJS
        2017.11.12 Version 6.0 Poppin' Party with React
        2018.10.07 Version 7.0 Kasumi with UmiJS
        2019.09.14 Version 7.2 Kasumi-Symphjoy with React-Symphjoy
        2020.10.03 Version 7.4 Kasumi-Symphjoy with React-Symphjoy

        `}
      </Typography>
    </div>
  );
}
