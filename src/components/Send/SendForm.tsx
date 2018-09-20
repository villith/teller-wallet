import {
  Button,
  FormControl,
  Grid,
  Input,
  Select,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
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
  form: {
    padding: theme.spacing.unit * 2
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  submitButton: {
    borderRadius: 0
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
          <Grid item={true} xs={12}>
            <Typography variant='display1'>Send TEL</Typography>
          </Grid>
          <Grid item={true} xs={6}>
            <Paper>
              <form className={classes.form}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor='contact'>Select Contact</InputLabel>
                  <Select
                    value={currentContact.id}
                    onChange={this.changeContact}
                    fullWidth={true}
                    inputProps={{
                      name: 'contact',
                      id: 'contact-select',
                    }}>
                      {this.buildContactSelect()}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Input
                    placeholder="Address (0x04...)"
                    className={classes.inputAddress}
                    readOnly={!currentContact}
                    fullWidth={true}
                    value={currentContact.address || ''}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Button className={classes.submitButton} size='large' variant='contained' color='primary'>
                    SEND
                  </Button>
                </FormControl>
              </form>
            </Paper>
          </Grid>
          <Grid item={true} xs={6}>
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