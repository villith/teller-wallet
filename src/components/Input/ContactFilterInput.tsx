import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface IContactFilterInputProps {
  placeholder?: string;
}

export interface IContactFilterInputState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class ContactFilterInput extends React.Component<WithStyles<any> & IContactFilterInputProps, IContactFilterInputState> {
  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} />
    );
  }
}

export default withStyles(styles)(ContactFilterInput)