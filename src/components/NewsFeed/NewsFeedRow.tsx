import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { ICryptoPanicPost } from './CryptoPanic';

export interface INewsFeedRowProps {
  post: ICryptoPanicPost;
}

export interface INewsFeedRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    width: '100%',
    transition: theme.transitions.create('flex', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
});

class NewsFeedRow extends React.Component<WithStyles<any> & INewsFeedRowProps, INewsFeedRowState> {
  public render() {
    const { classes, post } = this.props;
    return (
      <Paper className={classes.root}>
        {post.title}
      </Paper>
    );
  }
}

export default withStyles(styles)(NewsFeedRow);
