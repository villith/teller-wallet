import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface INumberFilterInputProps {
  placeholder?: string;
}

export interface INumberFilterInputState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class NumberFilterInput extends React.Component<WithStyles<any> & INumberFilterInputProps, INumberFilterInputState> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} />
    );
  }
}

export default withStyles(styles)(NumberFilterInput)