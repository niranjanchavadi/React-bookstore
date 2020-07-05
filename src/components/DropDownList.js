import React from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getSortAttribute } from "../Configuration/BookConfig";
import InputLabel from "@material-ui/core/InputLabel";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const theme1 = createMuiTheme({
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "rgb(255,255,255)"
        }
      }
    }
    ,MuiOutlinedInput:
    {input:{padding:"0 5px",}},

    MuiInputLabel:{formControl:{
        top:-4
    }}
  }
});
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "white"
  },
  
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    marginLeft: "0%",
    background: "white",
    display:"flex",

  },
  selectEmpty: {
    marginTop: theme.spacing.unit,
    height: "30px",
  },
});

class NativeSelects extends React.Component {
  constructor(props) {
    super(props);
    this.UNSAFE_componentWillMount();
  }
  state = {
    name: "hai",
    labelWidth: 0,
    sortBy: [],
    sortKey:"",
  };

  UNSAFE_componentWillMount = async() =>{
    await getSortAttribute()
      .then(res => {
        this.setState({
          sortBy: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
      if(localStorage.getItem('sortBooks')){
        this.setState({sortKey:JSON.parse(localStorage.getItem('sortBooks'))})
      }
      
  }

  sortData = event => {
    this.props.sortData(event.target.value);
    this.setState({sortKey:event.target.value})
  };

  render() {
    const { classes } = this.props;
    const sortBy = this.state.sortBy.map(values => {
      return  <MenuItem key={values.id} style={{cursor:"pointer"}}value={values}>{values}</MenuItem>
    })
    return (
      <MuiThemeProvider theme={theme1}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="SortByRelevance" className={classes.label}><b>SORT BY</b></InputLabel>
        <Select
          value={this.state.sortKey}
          onChange={this.sortData}
          name="sort"
          className={classes.selectEmpty}
          MenuProps={{
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            }
          }}
        >
          {sortBy}
        </Select>
      </FormControl>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(NativeSelects);
