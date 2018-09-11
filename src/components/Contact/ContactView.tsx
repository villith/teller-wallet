import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import ContactDetails from './ContactDetails';

export interface IContactViewProps {
  contact: Contact;
  currentTransaction: Transaction;
  toggleContactFavorite: (id: string) => void;
}

export interface IContactViewState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    width: '100%',
    transition: theme.transitions.create('flex', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
});

class ContactView extends React.Component<WithStyles<any> & IContactViewProps, IContactViewState> {
  public render() {
    const { classes, contact, currentTransaction, toggleContactFavorite } = this.props;
    return (
      <Paper className={classes.root}>
        <ContactDetails
          contact={contact}
          currentTransaction={currentTransaction}
          toggleContactFavorite={toggleContactFavorite}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(ContactView)