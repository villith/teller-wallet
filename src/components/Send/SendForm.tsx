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
import { Tx } from 'web3/eth/types';

import { Contact } from '../../classes/Contact';
import { getFullName } from '../../helpers/utils';
import { web3 } from '../../helpers/web3';
import { IUser } from '../../interfaces/User';
import ContactDetails from '../Contact/ContactDetails';
import { Aux } from '../winAux';

// @ts-ignore
export interface ISendFormProps {
  contacts: Contact[];
  currentContact: Contact;
  handleChangeContact: (id: string) => void;
  user: IUser;
}

export interface ISendFormState {
  amount: number;
  gas: number;
  gasPrice: number;
  error: Error;
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
    amount: 0,
    gas: 0,
    gasPrice: 0,
    error: {} as Error
  }

  public buildContactSelect = () => {
    const { contacts } = this.props;
    return contacts.map((contact, index) => {
      return (
        <MenuItem key={index} value={contact.id}>{getFullName(contact)}</MenuItem>
      )
    });
  }

  public changeContact = (event: any) => {
    this.props.handleChangeContact(event.target.value);
  }

  public changeAmount = (event: any) => {
    this.setState({ amount: event.target.value });
  }

  public sendEth = () => {
    const { amount, gas, gasPrice } = this.state;
    const { currentContact, user } = this.props;
    const transactionObject: Tx = {
      from: user.address,
      to: currentContact.address,
      value: amount,
      gas,
      gasPrice
    };
    web3.eth.sendTransaction(transactionObject, (error: any) => {
      this.setState({ error });
    })
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
                  <Button className={classes.submitButton} size='large' variant='contained' color='primary' onClick={this.sendEth}>
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