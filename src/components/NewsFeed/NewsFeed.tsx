import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import CryptoPanic from './CryptoPanic';

export interface INewsFeedProps {
  handleLoading: (loading: boolean) => void;
}

export interface INewsFeedState {
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

class NewsFeed extends React.Component<WithStyles<any> & INewsFeedProps, INewsFeedState> {
  public render() {
    const { classes, handleLoading } = this.props;
    return (
      <Paper className={classes.root}>
        <CryptoPanic
          handleLoading={handleLoading}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(NewsFeed);
