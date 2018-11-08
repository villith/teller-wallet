import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import Toolbar from './Toolbar';

export interface IToolbarContainerProps {
  placeholder?: string;
}

export interface IToolbarContainerState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    height: 40,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'red',
    '-webkit-app-region': 'drag'
  }
});

class ToolbarContainer extends React.Component<WithStyles<any> & IToolbarContainerProps, IToolbarContainerState> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Toolbar />
      </div>
    );
  }
}

export default withStyles(styles)(ToolbarContainer)