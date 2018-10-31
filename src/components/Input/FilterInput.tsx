import { FormControl, Input, InputLabel, Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import Downshift from 'downshift';
import * as React from 'react';

import { DataType, IFilter } from '../List/ListContainer';
import StringFilterInput from './StringFilterInput';

export interface IFilterInputProps {
  filter: IFilter;
  data: ISelectOption[]
}

export interface IFilterInputState {
  errorString: string;
  filterValue: any;
}

export interface ISelectOption {
  value: any;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class FilterInput extends React.Component<WithStyles<any> & IFilterInputProps, IFilterInputState> {
  public state = {
    filterValue: '',
    errorString: ''
  }

  public handleChangeFilterValue = (value: any) => {
    console.log(value);
    this.setState({ filterValue: value });
  }

  public parseValue = (filterType: DataType, value: string | null) => {
    let val: string | number | boolean = '';
    if (value) {
      switch (filterType) {
        case 'number':
          val = Number(value);
          break;
        case 'boolean':
          break;
        case 'undefined':
          break;
        default:
          break;
      }
    }
    return val;
  }

  public compareValues = (inputValue: any, optionValue: any, filterType: DataType) => {
    let result = false;
    let typedInputValue;
    let typedOptionValue;
    if (inputValue && optionValue) {
      switch (filterType) {
        case 'number':
          typedInputValue = inputValue as number;
          typedOptionValue = optionValue as number;
          if (typedInputValue === typedOptionValue) { result = true };
          break;
        case 'string':
          typedInputValue = inputValue as string;
          typedOptionValue = optionValue as string;
          if (typedInputValue === typedOptionValue) { result = true };
          break;
        case 'boolean':
          break;
        case 'undefined':
          break;
        default:
          break;
      }
    }
    return result;
  }

  public buildTypedFilterInput = (inputValue: any, filterType: DataType, downshiftProps: any) => {
    const { data } = this.props;
    switch (filterType) {
      case 'string':
        return <StringFilterInput inputValue={inputValue} data={data} {...downshiftProps} />;
      case 'number':
        return null;
        // return <NumberFilterInput inputValue={inputValue} data={data} {...downshiftProps} />;
      case 'boolean':
        return null;
        // return <BooleanFilterInput inputValue={inputValue} data={data} {...downshiftProps} />;
      case 'undefined':
        return null;
      default:
        return null;
    }
  }

  public render() {
    const { filterValue } = this.state;
    const { classes, filter } = this.props;
    const { key: filterKey, type: filterType } = filter;
    return (
      <Downshift
        id={`downshift-filter-${filter.key}`}
        onChange={this.handleChangeFilterValue}
        defaultInputValue={filterValue}
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
          return (
            <div>
              <FormControl margin='dense' className={classes.formControl}>
                <InputLabel htmlFor={`filter-${filterKey}`}>{`${filterKey.charAt(0).toUpperCase()}${filter.key.substr(1)}`}</InputLabel>
                <Input {...getInputProps()} />
              </FormControl>
              <div {...getMenuProps()}>
                {isOpen && (
                  <Paper className={classes.paper} elevation={4}>
                    {this.buildTypedFilterInput(inputValue, filterType, { getItemProps, selectedItem, highlightedIndex })}
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

export default withStyles(styles)(FilterInput)