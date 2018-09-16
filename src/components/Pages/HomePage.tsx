import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  StyleRulesCallback,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { getBalance, getFullName } from '../../helpers/utils';
import { IUser } from '../../interfaces/User';
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
    justifyContent: 'center',
  },
  cardHeader: {
    height: '55%',
    width: '100%',
    overflow: 'hidden'
  },
  media: {
  }
});

class HomePageRow extends React.Component<WithStyles<any> & IHomePageRowProps, IHomePageRowState> {
  public selectTransaction = (id: string) => {
    this.props.handleSelectTransaction(id);     
  }
  public render() {
    const { classes, contacts, currentTransaction, transactions, user } = this.props;
    const balance = getBalance(transactions, user.address);
    const conversionRate = 1.38;
    const convertedBalance = balance * conversionRate;
    return (
      <Aux>
        <Grid item={true} xs={4} className={classes.user}>
          <Card className={classes.card} elevation={4}>
            <CardMedia
              className={classes.media}
              image='teller_icon.png'
            />
            <CardContent>
              <Typography variant='headline'>{getFullName(user)}</Typography>
              <Typography className={classes.address} variant='caption'>{user.address}</Typography>
              <Typography variant='subheading'>BALANCE:
                &nbsp;<strong>{balance} TEL</strong>
                <Typography variant='caption'> (${convertedBalance.toFixed(2)} USD)</Typography>
              </Typography>
            </CardContent>
          </Card>
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