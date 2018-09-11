import { Fade, Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { findById, findByPublicKey } from '../../helpers/get';
import BalanceHistory from '../Charts/BalanceHistory';
import ContactView from '../Contact/ContactView';
import TransactionView from '../Transaction/TransactionView';
import TransactionListContainer from '../TransactionList/TransactionListContainer';
import { Aux } from '../winAux';

export interface IMainContentProps {
  contacts: Contact[];
  transactions: Transaction[];
  userDetails: {
    publicKey: string;
  }
  toggleContactFavorite: (id: string) => void;
}

export interface IMainContentState {
  currentTransaction: Transaction;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  tableWrapper: {
    overflowX: 'auto',
  },
  widgets: {
    '&> div': {
      marginBottom: theme.spacing.unit * 1.5
    }
  }
});

class MainContent extends React.Component<WithStyles<any> & IMainContentProps, IMainContentState> {
  public state = {
    currentTransaction: {} as Transaction
  }

  public handleSelectTransaction = (transactionId: string) => {
    const index = findById(transactionId, this.props.transactions);
    const tx = this.props.transactions[index];
    this.setState({ currentTransaction: tx });
  }

  public getTransactionContact = () => {
    const { currentTransaction } = this.state;
    const { contacts, userDetails } = this.props;
    let contact = {} as Contact;
    if (currentTransaction.id) {
      const incoming = currentTransaction.to === userDetails.publicKey;
      const publicKey = incoming ? currentTransaction.to : currentTransaction.from;
      const index = findByPublicKey(publicKey, contacts);
      if (index !== -1) {
        contact = contacts[index];
      }
      else {
        contact = new Contact(publicKey, '', '', ''); 
      }
      return contact;
    }
    else {
      return contact;
    }      
  }

  public render() {
    const { classes, contacts, toggleContactFavorite, transactions, userDetails } = this.props;
    const { currentTransaction } = this.state;
    const contact = this.getTransactionContact();
    return (
      <Aux>
        <Grid item={true} xs={6} md={7} className={classes.widgets}>
            {currentTransaction && currentTransaction.id &&
              <Fade>
                <TransactionView
                  currentTransaction={currentTransaction}
                  userDetails={userDetails}
                />
              </Fade>
            }
          {contact && contact.id &&
            <ContactView
              currentTransaction={currentTransaction}
              contact={contact}
              toggleContactFavorite={toggleContactFavorite}
            />
          }
          <BalanceHistory
            transactions={transactions}
            contacts={contacts}
            userDetails={userDetails}
          />
        </Grid>
        <Grid item={true} xs={6} md={5}>
          <TransactionListContainer
            currentTransaction={currentTransaction}
            transactions={transactions}
            handleSelectTransaction={this.handleSelectTransaction}
            userDetails={userDetails}
          />
        </Grid>
      </Aux>
    );
  }
}

export default withStyles(styles)(MainContent);