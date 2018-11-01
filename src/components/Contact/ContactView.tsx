import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import ContactDetails from './ContactDetails';

export interface IContactViewProps {
  contact: Contact;
  handleEditContact?: (contact: Contact) => void;
  handleDeleteContact?: (contact: Contact) => void;
  toggleContactFavorite?: (id: string) => void;
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
    const { classes, contact, handleDeleteContact, handleEditContact, toggleContactFavorite } = this.props;
    return (
      <Paper className={classes.root}>
        <ContactDetails
          contact={contact}
          toggleContactFavorite={toggleContactFavorite}
          handleEditContact={handleEditContact}
          handleDeleteContact={handleDeleteContact}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(ContactView)