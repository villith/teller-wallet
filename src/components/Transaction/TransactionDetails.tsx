import { Card, CardContent, Grid, StyleRulesCallback, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as jdenticon from 'jdenticon';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';

export interface ITransactionDetailsProps {
  currentTransaction: Transaction;
  user: IUser;
}

export interface ITransactionDetailsState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  actions: {
    float: 'right'
  },
  cardBody: {
    padding: theme.spacing.unit
  },
  cardHeader: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  },
  cardIcon: {
    padding: theme.spacing.unit
  },
  spacer: {
    flex: '1 1 100%',
  },
  cardTitle: {
    flex: '0 0 auto',
    '&:hover': {
      cursor: 'pointer'
    }
  },
});

class TransactionDetails extends React.Component<WithStyles<any> & ITransactionDetailsProps, ITransactionDetailsState> {
  public render() {
    const { classes, currentTransaction } = this.props;
    // @ts-ignore
    const svg = jdenticon.toSvg(currentTransaction.id, 48);
    return (
      <Card>
        <CardContent>
          <div className={classes.cardHeader}>
            <div className={classes.cardIcon}>
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            </div>
            <div className={classes.cardTitle}>
              <Typography variant='display1'>
                {currentTransaction.id.substr(0, 20)}...
              </Typography>
            </div>
          </div>
          <div className={classes.spacer} />
          <Grid container={true} className={classes.cardBody}>
            <Grid item={true} xs={6}>
              <Typography variant='headline'>Recipient</Typography>
              <Typography variant='body1'>{currentTransaction.to.substr(0, 20)}</Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography variant='headline'>Amount</Typography>
              <Typography variant='body1'>{currentTransaction.amount}</Typography>
            </Grid>
            <Grid item={true} xs={6}>
              <Typography variant='headline'>Balance After</Typography>
              <Typography variant='body1'><div className={classes.balance}>100 (-{currentTransaction.amount})</div></Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(TransactionDetails)