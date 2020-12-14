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
        MIT License
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Copyright 2020 Tokei {"."}
      </Typography>
      {/*<Typography variant="subtitle2" gutterBottom>*/}
      {/*  subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur*/}
      {/*</Typography>*/}
      <Typography variant="body1" gutterBottom paragraph>
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
        documentation files (the "Software"), to deal in the Software without restriction, including without limitation
        the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
        to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      </Typography>
      {/*<Typography variant="body2" gutterBottom>
        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
        documentation files (the "Software"), to deal in the Software without restriction, including without limitation
        the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
        to permit persons to whom the Software is furnished to do so, subject to the following conditions:
      </Typography>*/}
      <Typography variant="button" display="block" gutterBottom paragraph>
        The above copyright notice and this permission notice shall be included in all copies
        or substantial portions of the Software.
      </Typography>
      <Typography variant="caption" display="block" gutterBottom paragraph>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
        TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
        THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
        CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
        DEALINGS IN THE SOFTWARE.
      </Typography>
      {/*<Typography variant="overline" display="block" gutterBottom>*/}
      {/*  overline text*/}
      {/*</Typography>*/}
    </div>
  );
}
