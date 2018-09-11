import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';

export interface IHomePageRowProps {
  contacts: Contact[];
  transactions: Transaction[];
}

export interface IHomePageRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class HomePageRow extends React.Component<WithStyles<any> & IHomePageRowProps, IHomePageRowState> { 
  public render() {
    const { classes } = this.props;
    
    return (
      <Paper className={classes.root} />
    );
  }
}

export default withStyles(styles)(HomePageRow)