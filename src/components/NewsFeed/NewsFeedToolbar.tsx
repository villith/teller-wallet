import {
  IconButton,
  StyleRulesCallback,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import * as React from 'react';

import { CryptoPanicFilter } from './CryptoPanic';

export interface INewsFeedToolbarProps {
  title: string;
  refreshFeed: (filter: CryptoPanicFilter) => void;
}

export interface INewsFeedToolbarState {
  currentFilter: CryptoPanicFilter;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  title: {},
});

class NewsFeedToolbar extends React.Component<WithStyles<any> & INewsFeedToolbarProps, INewsFeedToolbarState> {
  public state = {
    currentFilter: 'hot' as CryptoPanicFilter
  }

  public handleRefreshFeed = () => {
    this.props.refreshFeed(this.state.currentFilter);
  }

  public render() {
    const { classes, title } = this.props;
    return (
      <Toolbar>
        <div className={classes.title}>
          <Typography variant='title'>
            {title}
          </Typography>
        </div>
        <div className={classes.actions}>
          <Tooltip title='Refresh Feed'>
            <IconButton onClick={this.handleRefreshFeed}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(NewsFeedToolbar)