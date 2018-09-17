import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import CryptoPanic from './CryptoPanic';

export interface INewsFeedProps {
  loading: boolean;
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
    minHeight: '300px'
  },
});

class NewsFeed extends React.Component<WithStyles<any> & INewsFeedProps, INewsFeedState> {
  public render() {
    const { loading, handleLoading } = this.props;
    return (
      <CryptoPanic
        loading={loading}
        handleLoading={handleLoading}
      />
    );
  }
}

export default withStyles(styles)(NewsFeed);
