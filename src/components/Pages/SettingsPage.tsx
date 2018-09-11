import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';

export interface ISettingsPageRowProps {
  contacts: Contact[];
  transactions: Transaction[];
}

export interface ISettingsPageRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class SettingsPageRow extends React.Component<WithStyles<any> & ISettingsPageRowProps, ISettingsPageRowState> { 
  public render() {
    const { classes } = this.props;
    
    return (
      <Paper className={classes.root} />
    );
  }
}

export default withStyles(styles)(SettingsPageRow)