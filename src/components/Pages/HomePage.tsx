import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import ProfileCard from '../Card/ProfileCard';
import TransactionListContainer from '../TransactionList/TransactionListContainer';
import { Aux } from '../winAux';

export interface IHomePageRowProps {
  currentTransaction: Transaction;
  handleSelectTransaction: (id: string) => void;
  contacts: Contact[];
  transactions: Transaction[];
  user: IUser;
}

export interface IHomePageRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  address: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    overflowWrap: 'break-word',
    wordWrap: 'break-word'
  },
  card: {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'center'
  },
  cardHeader: {
    height: '55%',
    width: '100%',
    overflow: 'hidden'
  },
  content: {
    maxWidth: '100%'
  },
  mediaContainer: {
    padding: theme.spacing.unit
  },
  media: {
    height: '100%',
    width: 'auto',
    backgroundSize: 'contain !important'
  }
});

class HomePageRow extends React.Component<WithStyles<any> & IHomePageRowProps, IHomePageRowState> {
  public selectTransaction = (id: string) => {
    this.props.handleSelectTransaction(id);     
  }
  public render() {
    const { classes, contacts, currentTransaction, transactions, user } = this.props;
    return (
      <Aux>
        <Grid item={true} xs={4} className={classes.user}>
          <ProfileCard
            user={user}
            transactions={transactions}
          />
        </Grid>
        <Grid item={true} xs={4} className={classes.transactionList}>
          <TransactionListContainer
            currentTransaction={currentTransaction}
            transactions={transactions}
            user={user}
            handleSelectTransaction={this.selectTransaction}
            listName={'Recent Transactions'}
            numRows={5}
            sortable={false}
            contacts={contacts}
          />
        </Grid>
        {/* <Grid item={true} xs={4} className={classes.newsFeed}>
          <NewsFeedContainer />
        </Grid> */}
      </Aux>
    );
  }
}

export default withStyles(styles)(HomePageRow)