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
      {/*<Typography variant="h1" component="h2" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. Heading
      </Typography>
      <Typography variant="h4" gutterBottom>
        h4. Heading
      </Typography>
      <Typography variant="h5" gutterBottom>
        h5. Heading
      </Typography>*/}
      <Typography variant="h6" gutterBottom paragraph>
        Status
      </Typography>
      <Typography variant="body1" gutterBottom paragraph>
        Publish on 2021.01.01, version 8.0.0, front-end with Material-ui, Umijs & Reactjs，back-end with Go.
      </Typography>
      <Typography variant="h6" gutterBottom paragraph>
        Announcement
      </Typography>
      <Typography variant="body1" gutterBottom paragraph>
        Personal Website. Do <b>NOT</b> provide online music resource with any <b>UNAUTHORIZED</b> person.
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
        Copyright 2021 Tokei {"."}
      </Typography>
      {/*<Typography variant="subtitle2" gutterBottom>*/}
      {/*  subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur*/}
      {/*</Typography>*/}
      <Typography variant="body1" gutterBottom paragraph>
        Nekohand 公式サイト
        Copyright (C) 2021 Nekohand 公式サイト委員會/EC小站
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
    </div>
  );
}
