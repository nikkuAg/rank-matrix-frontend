import { Popover, List, ListItem, ListItemButton, ListSubheader, ListItemText, ListItemIcon, Divider, IconButton, } from "@mui/material"
import { filters } from "../../constants/filters"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TextForm } from "./forms/TextForm";
import { ChoiceForm } from "./forms/ChoiceForm";
import { NumberForm } from "./forms/NumberForm";
import { useEffect, useState } from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


export const FilterBox = ({ headerName, anchorEl, handleClose, filterName, hid, filterValues, setFilterValues, sortHandler }) => {
  const form_is_open = filters[filterName].reduce((accumulator, obj) => {
    accumulator[obj.name] = false;
    return accumulator
  }, {});
  const [formIsOpen, setFormIsOpen] = useState(form_is_open);
  const handleFormOpen = (id) => {
    const modified_object = {
      ...formIsOpen,
      [id]: true

    }
    setFormIsOpen(modified_object);

  }
  const handleFormClose = (id) => {
    const modified_filters = {
      ...formIsOpen,
      [id]: false

    }
    setFormIsOpen(modified_filters);
  }
  const handleClick = (id) => {
    if (formIsOpen[id] === true) {
      handleFormClose(id);
    }
    else {
      handleFormOpen(id);
    }
  }
  const handleSort = (ordering) => {
    handleClose(hid);
    sortHandler(hid, false, ordering)();

  }
  const resetFilters = () => {
    let modified_object = filterValues;
    for (let obj in filters[filterName]) {
      if (filters[filterName][obj].keyword) {
        modified_object = { ...modified_object, [filters[filterName][obj].keyword]: null };
      }
      if (filters[filterName][obj].max_keyword) {
        modified_object = { ...modified_object, [filters[filterName][obj].max_keyword]: null };
      }
      if (filters[filterName][obj].min_keyword) {
        modified_object = { ...modified_object, [filters[filterName][obj].min_keyword]: null };
      }
    }
    handleClose(hid)
    setFilterValues(modified_object);


  }
  return (
    <Popover
      id={`${headerName}-filter`}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={(event) => {
        event.stopPropagation()
        handleClose(hid)
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <List>
        <ListItem sx={{ flexDirection: "row", justifyContent: "space-between", padding: 0 }} disablepadding>
          <ListSubheader>
            Sort
          </ListSubheader>
          <IconButton onClick={resetFilters}>
            <RestartAltIcon />
          </IconButton>
        </ListItem>
        <ListItemButton onClick={() => {
          handleSort("asc");
        }}>
          <ListItemIcon>
            <ArrowUpwardIcon />
          </ListItemIcon>
          <ListItemText>Sort In Ascending Order</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={() => {
          handleSort("dec");
        }}>
          <ListItemIcon>
            <ArrowDownwardIcon />
          </ListItemIcon>
          <ListItemText>Sort In Descending Order</ListItemText>
        </ListItemButton>
        <Divider sx={{ display: "block !important" }} />
        <ListSubheader>
          Filters
        </ListSubheader>
        {filters[filterName].map((filter) => {
          return (
            <>
              <ListItemButton onClick={() => {
                handleClick(filter.name)
              }}>
                {filter.type !== "number" && filterValues[filter.keyword] ? (<FilterAltIcon />) : (<></>)}
                {filter.type === "number" && (filterValues[filter.min_keyword] || filterValues[filter.max_keyword]) ? (<FilterAltIcon />) : (<></>)}
                <ListItemText>
                  {filter.name}
                </ListItemText>
                {formIsOpen[filter.name] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <ListItem sx={{ padding: 0 }}>
                {filter.type === "text" ? (
                  <TextForm
                    hid={hid}
                    handleParentClose={handleClose}
                    isOpen={formIsOpen[filter.name]}
                    onClose={handleFormClose} filter={filter}
                    filterValues={filterValues}
                    setFilterValues={setFilterValues}
                  />)
                  : filter.type === "number" ? (
                    <NumberForm
                      hid={hid}
                      isOpen={formIsOpen[filter.name]}
                      onClose={handleFormClose} filter={filter}
                      handleParentClose={handleClose} setFilterValues={setFilterValues}
                      filterValues={filterValues}
                    />)
                    : (
                      <ChoiceForm
                        hid={hid}
                        isOpen={formIsOpen[filter.name]}
                        onClose={handleFormClose}
                        filter={filter}
                        setFilterValues={setFilterValues}
                        handleParentClose={handleClose}
                        filterValues={filterValues}
                      />)}
              </ListItem>
            </>
          )
        })}
      </List>

    </Popover>
  )
}