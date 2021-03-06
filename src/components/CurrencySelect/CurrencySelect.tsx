import {
  MenuItem,
  Paper,
  StyleRulesCallback,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';
import * as cc from 'currency-codes';
import * as symbols from 'currency-symbol-map';
import Downshift from 'downshift';
import * as React from 'react';

import { FiatCurrencyCodes } from '../../enums/CurrencyCodes';

export interface ICurrencySelectProps {
  currencyCode: string;
  handleSelectCurrency: (currencyCode: string) => void;
}

export interface ICurrencySelectState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: '250px'
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  input: {
    color: 'white !important',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    overflowY: 'scroll',
    maxHeight: '300px'
  },
  menuItem: {
    display: 'flex',
  },
  inputSymbol: {
    marginRight: theme.spacing.unit
  },
  label: {
    right: theme.spacing.unit,
    position: "absolute",
  },
  MuiTypography: {
    color: 'white'
  }
});

interface ISelectOption {
  name: string;
  value: string;
  symbol: string;
}

const selectOptions: ISelectOption[] = [];

cc.codes()
  .filter(code => FiatCurrencyCodes[code])
  .sort()
  .map((code, index) => {
    const selectOption: ISelectOption = {
      name: cc.code(code).currency,
      value: code,
      symbol: symbols(code)
    };
    selectOptions.push(selectOption);
});

class CurrencySelect extends React.Component<WithStyles<any> & ICurrencySelectProps, ICurrencySelectState> {  
  public selectCurrency = (value: any) => {
    this.props.handleSelectCurrency(value);
  }

  public render() {
    const { classes, currencyCode } = this.props;
    return (
      <Downshift 
        id='downshift-select'
        onChange={this.selectCurrency}
        defaultInputValue={currencyCode}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
          setState
        }) => {
          const inputValueLower = inputValue && inputValue.toLocaleLowerCase();
          return (
            <div className={classes.container}>
              <div className={classes.input}>
                <Typography style={{ color: 'white' }} variant='caption'>Currency</Typography>
                <span className={classes.inputSymbol}>{symbols(currencyCode)}</span>
                <TextField
                  {...getInputProps()}
                />
                <span><ArrowDropDownIcon onClick={() => setState(prevState => ({ isOpen: !prevState.isOpen }))}/></span>
              </div>
              <div {...getMenuProps()}>
                {isOpen && (
                  <Paper className={classes.paper} elevation={4}>
                    {selectOptions.filter(option => {
                      const { name, value } = option;
                      const nameLower = name.toLocaleLowerCase();
                      const valueLower = value.toLocaleLowerCase();
                      const result = !inputValueLower || (valueLower.includes(inputValueLower) || nameLower.includes(inputValueLower));
                      return result;
                    })
                    .map((item, index) => {
                      const { name, value, symbol } = item;
                      const isSelected = (selectedItem || '').indexOf(value) > -1;
                      return (
                        <MenuItem
                          {...getItemProps({ item: value })}
                          component='div'
                          selected={highlightedIndex === index}
                          style={{
                            fontWeight: isSelected ? 500 : 400,
                          }}
                          key={index}
                          className={classes.menuItem}
                        >
                          <Typography variant='caption'>{symbol}</Typography>
                          <Typography className={classes.label} align='right'>{name}</Typography>                          
                        </MenuItem>
                      )
                  })}
                  </Paper>
                )}
              </div>
            </div>
          )
        }}
      </Downshift>
    );
  }
}

export default withStyles(styles)(CurrencySelect)