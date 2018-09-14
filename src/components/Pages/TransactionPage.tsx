import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import BalanceHistory from '../Charts/BalanceHistory';
import ContactView from '../Contact/ContactView';
import TransactionView from '../Transaction/TransactionView';
import TransactionListContainer from '../TransactionList/TransactionListContainer';
import { Aux } from '../winAux';

export interface ITransactionPageProps {
  contact: Contact;
  contacts: Contact[];
  currentTransaction: Transaction;
  handleSelectTransaction: (id: string) => void;
  transactions: Transaction[];
  user: IUser;
  toggleContactFavorite: (id: string) => void;
}

export interface ITransactionPageRowState {
  placeholder?: string;
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

class TransactionPageRow extends React.Component<WithStyles<any> & ITransactionPageProps, ITransactionPageRowState> { 
  
  public render() {
    const { classes, currentTransaction, contact, contacts, handleSelectTransaction, user, toggleContactFavorite, transactions } = this.props;
    
    return (
      <Aux>
        <Grid item={true} xs={6} md={7} className={classes.widgets}>
          {currentTransaction && currentTransaction.id &&
            <TransactionView
              currentTransaction={currentTransaction}
              user={user}
            />
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
          user={user}
        />
      </Grid>
      <Grid item={true} xs={6} md={5}>
        <TransactionListContainer
          currentTransaction={currentTransaction}
          transactions={transactions}
          handleSelectTransaction={handleSelectTransaction}
          user={user}
        />
      </Grid>
    </Aux>
    );
  }
}

export default withStyles(styles)(TransactionPageRow)