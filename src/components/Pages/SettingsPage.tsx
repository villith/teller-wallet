import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';

export interface ISettingsPageRowProps {
  contacts: Contact[];
  transactions: Transaction[];
}

export interface ISettingsPageRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  form: {
    padding: theme.spacing.unit * 2
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

const settings = [
  {
    label: 'Dark Mode',
    accessor: 'darkMode',
    type: 'boolean'
  },
];

class SettingsPageRow extends React.Component<WithStyles<any> & ISettingsPageRowProps, ISettingsPageRowState> { 
  public getInputComponent = (setting: any) => {
    const { type } = setting;
    switch (type) {
      case 'string':
        return (
          <div>STRING</div>
        );
      case 'boolean':
        return (
          <Checkbox checked={true} />
        );    
      default:
        return (
          <div>DEFAULT</div>
        );
    }
  }
  public render() {
    const { classes } = this.props;
    return (
      <Grid item={true} xs={12}>
        <Paper>
          <form className={classes.form}>
            <Grid container={true} spacing={8}>
              {settings.map((setting, index) => {
                return (
                  <Grid key={index} item={true} xs={6}>
                    <FormControl className={classes.formControl}>
                      <FormControlLabel
                        control={this.getInputComponent(setting)}
                        label={setting.label}
                      />
                    </FormControl>
                  </Grid>
                )
              })}
            </Grid>
          </form>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(SettingsPageRow)