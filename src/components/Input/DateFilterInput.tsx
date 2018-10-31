import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface IDateFilterInputProps {
  placeholder?: string;
}

export interface IDateFilterInputState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class DateFilterInput extends React.Component<WithStyles<any> & IDateFilterInputProps, IDateFilterInputState> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} />
    );
  }
}

export default withStyles(styles)(DateFilterInput)