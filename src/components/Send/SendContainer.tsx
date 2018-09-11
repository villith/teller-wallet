import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';

export interface ISendContainerRowProps {
  contacts: Contact[];
  transactions: Transaction[];
}

export interface ISendContainerRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class SendContainerRow extends React.Component<WithStyles<any> & ISendContainerRowProps, ISendContainerRowState> { 
  public render() {
    const { classes } = this.props;
    
    return (
      <Paper className={classes.root} />
    );
  }
}

export default withStyles(styles)(SendContainerRow)