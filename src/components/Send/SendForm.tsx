import { FormControl, Grid, Input, Select, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { getFullName } from '../../helpers/utils';
import ContactDetails from '../Contact/ContactDetails';
import { Aux } from '../winAux';

export interface ISendFormProps {
  contacts: Contact[];
  currentContact: Contact;
  handleChangeContact: (id: string) => void;
}

export interface ISendFormState {
  [index: string]: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class SendForm extends React.Component<WithStyles<any> & ISendFormProps, ISendFormState> {
  public state = {
    address: '',
  }
  public buildContactSelect = () => {
    const { contacts } = this.props;
    return contacts.map((contact, index) => {
      return (
        <MenuItem key={index} value={contact.id}>{getFullName(contact)}</MenuItem>
      )
    });
  }

  public handleFormChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  public changeContact = (event: any) => {
    this.props.handleChangeContact(event.target.value);
  }

  public render() {
    const { classes, currentContact } = this.props;
    return (
      <Aux>
        <Grid container={true} spacing={8}>
          <Typography variant='display1'>Send TEL</Typography>
          <Grid item={true} xs={7}>
            <Paper>
              <form>
                <FormControl className={classes.formControl} fullWidth={true}>
                  <InputLabel htmlFor='contact'>Select Contact</InputLabel>
                  <Select
                    value={currentContact.id}
                    onChange={this.changeContact}
                    inputProps={{
                      name: 'contact',
                      id: 'contact-select'
                    }}>
                      {this.buildContactSelect()}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth={true}>
                  <Input
                    placeholder="Address (0x04...)"
                    className={classes.inputAddress}
                    readOnly={!currentContact}
                    value={currentContact.address || ''}
                  />
                </FormControl>
              </form>
            </Paper>
          </Grid>
          <Grid item={true} xs={4}>
            <ContactDetails
              contact={currentContact}
            />
          </Grid>
        </Grid>
      </Aux>
    );
  }
}

export default withStyles(styles)(SendForm)