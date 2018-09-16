import { CircularProgress, Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import NewsFeed from './NewsFeed';

export interface INewsFeedContainerProps {
  placeholder?: string;
}

export interface INewsFeedContainerState {
  loading: boolean;
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

class NewsFeedContainer extends React.Component<WithStyles<any> & INewsFeedContainerProps, INewsFeedContainerState> {
  public state = {
    loading: true
  }

  public handleLoading = (loading: boolean) => {
    this.setState({ loading });
  }

  public render() {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <Paper className={classes.root}>
        {loading ? (
          <CircularProgress className={classes.loading} size={48} />
        ) : (
          <NewsFeed
            handleLoading={this.handleLoading}
          />
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(NewsFeedContainer);
