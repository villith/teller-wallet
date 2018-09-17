import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { CryptoPanicFilter } from './CryptoPanic';
import NewsFeed from './NewsFeed';
import NewsFeedToolbar from './NewsFeedToolbar';

export interface INewsFeedContainerProps {
  placeholder?: string;
}

export interface INewsFeedContainerState {
  loading: boolean;
  cryptoPanicFilter: CryptoPanicFilter;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    width: '100%',
    transition: theme.transitions.create('flex', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column'
  },
});

class NewsFeedContainer extends React.Component<WithStyles<any> & INewsFeedContainerProps, INewsFeedContainerState> {
  public state = {
    loading: true,
    cryptoPanicFilter: 'hot' as CryptoPanicFilter
  }

  public handleLoading = (loading: boolean) => {
    this.setState({ loading });
  }

  public refreshFeed = (filter: CryptoPanicFilter) => {
    this.handleLoading(true);
  }

  public render() {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <Paper className={classes.root}>
        <NewsFeedToolbar 
          title={'News Feed'}
          refreshFeed={this.refreshFeed}
        />
        <NewsFeed
          loading={loading}
          handleLoading={this.handleLoading}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(NewsFeedContainer);
