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
  },
  dividerText: {
    opacity: 0.35,
    fontSize: 18,
    marginTop: '16px'
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

  public changeGas = (event: any) => {
    this.setState({ gas: event.target.value });
  }

  public changeGasPrice = (event: any) => {
    this.setState({ gasPrice: event.target.value });
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
    const { amount, gas, gasPrice } = this.state;
    const { classes, currentContact } = this.props;
    return (
      <Aux>
        <Grid container={true} spacing={8}>
          <Grid item={true} xs={6}>
            <Paper>
              <form className={classes.form}>
                <Grid container={true} spacing={8}>
                  <Grid item={true} xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor='contact'>Select Contact</InputLabel>
                      <Select
                        value={currentContact.id}
                        onChange={this.changeContact}
                        fullWidth={true}
                        inputProps={{
                          name: 'contact',
                          id: 'contact',
                        }}
                      >
                        {this.buildContactSelect()}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item={true} xs={12}>
                    <Typography align='center' className={classes.dividerText}> - OR - </Typography>
                  </Grid>
                  <Grid item={true} xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor='address'>Enter Address</InputLabel>
                      <Input
                        placeholder="Address (0x04...)"
                        className={classes.inputAddress}
                        readOnly={!currentContact}
                        disabled={!currentContact}
                        fullWidth={true}
                        inputProps={{
                          name: 'address',
                          id: 'address'
                        }}
                        value={currentContact.address || ''}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item={true} md={4} xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor='amount'>Enter Amount</InputLabel>
                      <Input
                        placeholder="Enter Amount"
                        className={classes.inputAmount}
                        inputProps={{
                          name: 'amount',
                          id: 'amount',
                          type: 'number',
                          autoComplete: 'off',
                          inputMode: 'numeric'
                        }}
                        value={amount}
                        onChange={this.changeAmount}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item={true} md={4} xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor='gas'>Enter Gas</InputLabel>
                      <Input
                        placeholder="Enter Gas"
                        className={classes.inputGas}
                        inputProps={{
                          name: 'gas',
                          id: 'gas',
                          type: 'number',
                          autoComplete: 'off',
                          inputMode: 'numeric'
                        }}
                        value={gas}
                        onChange={this.changeGas}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item={true} md={4} xs={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor='gasPrice'>Enter Gas Price</InputLabel>
                      <Input
                        placeholder="Enter Gas Price"
                        className={classes.inputGasPrice}
                        inputProps={{
                          name: 'gasPrice',
                          id: 'gasPrice',
                          type: 'number',
                          autoComplete: 'off',
                          inputMode: 'numeric'
                        }}
                        value={gasPrice}
                        onChange={this.changeGasPrice}
                      />
                    </FormControl>
                  </Grid>
                  <FormControl className={classes.formControl}>
                    <Button className={classes.submitButton} size='large' variant='contained' color='primary' onClick={this.sendEth}>
                      SEND
                    </Button>
                  </FormControl>
                </Grid>
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