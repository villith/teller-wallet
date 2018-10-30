import { FormControl, Input, InputLabel, Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import Downshift from 'downshift';
import * as React from 'react';

import { IFilter } from '../List/ListContainer';

export interface IFilterInputProps {
  filter: IFilter;
}

export interface IFilterInputState {
  errorString: string;
  filterValue: any;
}

interface ISelectOption {
  name: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

const selectOptions: ISelectOption[] = [];

selectOptions.push({ name: 'test' });

class FilterInput extends React.Component<WithStyles<any> & IFilterInputProps, IFilterInputState> {
  public state = {
    filterValue: '',
    errorString: ''
  }

  public handleChangeFilter = (value: any) => {
    this.setState({ filterValue: value });
  }

  public render() {
    const { classes, filter } = this.props;
    return (
      <Downshift
        id={`downshift-filter-${filter.key}`}
        onChange={this.handleChangeFilter}
        defaultInputValue=''
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
            <div>
              <FormControl margin='dense' className={classes.formControl}>
                <InputLabel htmlFor={`filter-${filter.key}`}>{`${filter.key.charAt(0).toUpperCase()}${filter.key.substr(1)}`}</InputLabel>
                <Input {...getInputProps()} />
              </FormControl>
              <div {...getMenuProps()}>
                {isOpen && (
                  <Paper className={classes.paper} elevation={4}>
                    {selectOptions.filter((option) => {                      
                      const { name } = option;
                      const nameLower = name.toLocaleLowerCase();
                      const result = !inputValueLower || nameLower.includes(inputValueLower);
                      return result;
                    })
                    .map((option, index) => {
                      return (
                        <div key={index}>
                          {option.name}
                        </div>
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

export default withStyles(styles)(FilterInput)