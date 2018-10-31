import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface IBooleanFilterInputProps {
  placeholder?: string;
}

export interface IBooleanFilterInputState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class BooleanFilterInput extends React.Component<WithStyles<any> & IBooleanFilterInputProps, IBooleanFilterInputState> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} />
    );
  }
}

export default withStyles(styles)(BooleanFilterInput)