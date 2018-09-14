import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import ReactEcharts from 'echarts-for-react';
import * as moment from 'moment';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';

export interface IBalanceHistoryProps {
  contacts: Contact[];
  transactions: Transaction[];
  user: IUser;
}

export interface IBalanceHistoryState {
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

class BalanceHistory extends React.Component<WithStyles<any> & IBalanceHistoryProps, IBalanceHistoryState> {
  public getOption = () => {
    const getValues = () => {
      let balance = 0;
      const values = this.props.transactions
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(transaction => {
          const { id, amount, to, timestamp } = transaction;
          const incoming = to === this.props.user.address;
          console.log(`INCOMING: ${incoming} | AMOUNT: ${amount}`);
          incoming ? balance += amount : balance -= amount;
          console.log(`BALANCE: ${balance}`);
          const value = [
            timestamp,
            balance
          ];
          return {
            id,
            to,
            amount,
            timestamp,
            value
          }
      });

      console.log(values);
      return values;
    }
    const options = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const { data } = params[0];
          return (
            `<div>${data.id}</div>
            <div>Recipient: ${data.to.substr(0, 10)}</div>
            <div>Amount: ${data.amount}</div>
            <div>Time Sent: ${moment(data.timestamp).format('HH:mm:ss')}</div>`
          )
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        }
      },
      series: [{
        type: 'line',
        data: getValues()
      }],
    }
    return options;
  }
  public render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <ReactEcharts
          option={this.getOption()}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(BalanceHistory)