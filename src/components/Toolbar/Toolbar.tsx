import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface IToolbarProps {
  placeholder?: string;
}

export interface IToolbarState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class Toolbar extends React.Component<WithStyles<any> & IToolbarProps, IToolbarState> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} />
    );
  }
}

export default withStyles(styles)(Toolbar)