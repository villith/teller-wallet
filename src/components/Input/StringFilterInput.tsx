import { MenuItem, StyleRulesCallback, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { ISelectOption } from './FilterInput';

export interface IStringFilterInputProps {
  data: ISelectOption[];
  getItemProps: any;
  highlightedIndex: number | null;
  inputValue: string;
  selectedItem: any;
}

export interface IStringFilterInputState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class StringFilterInput extends React.Component<WithStyles<any> & IStringFilterInputProps, IStringFilterInputState> {
  public parseValue = (value: string | null) => {
    let val = '';
    if (value) { val = value.toLocaleLowerCase(); }
    return val;
  }

  public compareValues = (inputValue: string, optionValue: string) => {
    let result = false;
    if (inputValue) { result = optionValue.includes(inputValue); }
    return result;
  }

  public render() {
    const { classes, data, getItemProps, highlightedIndex, selectedItem, inputValue } = this.props;
    const parsedInputValue = this.parseValue(inputValue);
    console.log(data);
    return (
      data
        .filter((option) => {
          const { value: optionValue } = option;
          const parsedOptionValue = this.parseValue(optionValue);
          const result = this.compareValues(parsedInputValue, parsedOptionValue);
          return result;
        })
        .map((option, index) => {
          const { value } = option;
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
              <Typography className={classes.label}>{value}</Typography>
            </MenuItem>
          )
        })
    )
  }
}

export default withStyles(styles)(StringFilterInput)