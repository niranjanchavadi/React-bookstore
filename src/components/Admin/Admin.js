import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookIcon from '@material-ui/icons/MenuBookSharp';
import { IconButton, Grid, Badge, Button, Popover, MenuItem, Avatar } from '@material-ui/core';
import { fade, withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { getBookList, getBooksCount } from '../../Configuration/BookConfig';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';
import '../../css/Admin.css';
import { getAdminUnverifiedBookList, bookUnVerification, bookVerification } from '../../Configuration/BookConfig';
import AdminProfile from '../Profile/AdminProfile';
import AdminDashboard from './AdminDashboard';
import Adminbooks from './Adminbooks';
import Pagination from '../pagination/Pagination';

const theme1 = createMuiTheme({
    overrides: {
        MuiPopover: {
            paper: {
                width: 'auto',
                height: 'auto',
                marginLeft: '-10%',
                marginTop: '-18%',
            },
        },
    },
});

const useStyles = (theme) => ({
    title: {
        display: 'none',
        paddingLeft: '0.5%',
        fontSize: '140%',
        overflow: 'visible',
        marginTop: '5px',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(20),
        marginLeft: '20%',
        width: '55%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgb(184,184,184)',
        zIndex: 1,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 6),
        justifyContent: 'center',
        transition: theme.transitions.create('width'),
        paddingRight: 30,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 400,
        },
        opacity: 1,
        backgroundColor: 'white',
        borderRadius: '4px',
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    bookIcon: {
        fontSize: '36px',
        [theme.breakpoints.up('sm')]: {
            fontSize: '36px',
        },
    },
    accountIcon: {
        color: 'white',
        marginLeft: ' 59%',
        [theme.breakpoints.up('md')]: {
            marginLeft: '300%',
        },
    },
    appBar: {
        padding: '0 10%',
        backgroundColor: '#A03037',
        position: 'fixed',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    gridDiv: {
        width: 'auto',
        flexWrap: 'noWrap',
        alignItems: 'center',
    },
});

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // bookList: [],
            displayType: 'allBooks',
            filterArray: [],
            isSearching: false,
            filterArrayCount: 0,
            clickedId: [],
            clickedIddisapprove: [],
            books: [],
            bookCount: 0,
            addToBagBtnText: 'Approved',
            disapprovedtext: 'disapproved',
            currentPage: 1,
            postsPerPage: 8,
            // page: 1,
        };
    }

    homePage = (event) => {
        if (this.props.history.location.pathname !== '/') {
            this.props.homePage();
        }
    };

    getBookLists = () => {
        let token = localStorage.getItem('Token');
        console.log(token, 'token');
        if (this.state.displayType === 'allBooks') {
            getAdminUnverifiedBookList(token)
                .then((res) => {
                    this.setState({ books: res.data.data });
                    this.setState({
                        maxNumOfPage: Math.ceil(this.state.books.length / this.state.todosPerPage),
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    paginate = (pageNumber) => {
        this.setState({
            currentPage: pageNumber,
        });
        console.log('pagenumber after', this.state.currentPage);
    };

    handleApproved = (clickedID) => {
        // let cartCount = this.state.cartCount;
        let clickedid = this.state.clickedId;
        clickedid.push(clickedID);
        this.setState({
            // cartCount: this.state.cartCount,
            clickedId: [...clickedid],
            addToBagBtnText: 'Approved',
        });
        var cart = {
            bookId: clickedID,
        };

        let token = localStorage.getItem('Token');
        // 	console.log(token, 'token');
        const response = bookVerification(cart, token);
        response.then((res) => {
            console.log('Approved Response ', res.data);
        });
    };

    handledisApprove = (clickedID2) => {
        let clickediddisapprove = this.state.clickedIddisapprove;
        clickediddisapprove.push(clickedID2);
        this.setState({
            // cartCount: this.state.cartCount,
            clickedIddisapprove: [...clickediddisapprove],
            disapprovedtext: 'disApproved',
        });
        var cart = {
            bookId: clickedID2,
        };

        let token = localStorage.getItem('Token');
        // 	console.log(token, 'token');
        const response = bookUnVerification(cart, token);
        response.then((res) => {
            console.log('disApproved Response ', res.data);
        });
    };

    componentDidMount() {
        this.getBookLists();
    }

    handleChange = () => {
        this.props.history.push('/login');
    };

    handleClose = () => {
        this.setState({
            menuOpen: false,
        });
    };
    handleClickProfile = (event) => {
        this.setState({
            menuOpen: true,
            menuAnchorEl: event.currentTarget,
        });
    };

    searchHandler = (event) => {
        let search = event.target.value;
        if (search.toString().length >= 1) {
            const newData = this.state.books.filter((item) => {
                return (
                    item.bookName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
                    item.authorName.toLowerCase().indexOf(search.toLowerCase()) > -1
                );
            });
            this.setState({
                isSearching: true,
                filterArray: newData,
                filterArrayCount: newData.length,
            });
        } else {
            this.setState({
                isSearching: false,
            });
        }
    };

    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.books.slice(indexOfFirstPost, indexOfLastPost);

        return ( <
            >
            <
            AdminDashboard searchHandler = { this.searchHandler }
            /> <
            >
            <
            Adminbooks books = { this.state.isSearching ? this.state.filterArray : currentPosts }
            bookCount = { this.state.isSearching ? this.state.filterArrayCount : this.state.bookCount }
            TotalCount = { this.state.books.length }
            onChangePaginationHandler = { this.onChangePaginationHandler }
            handleApproved = { this.handleApproved }
            handledisApprove = { this.handledisApprove }
            clickedId = { this.state.clickedId }
            clickedIddisapprove = { this.state.clickedIddisapprove }
            addToBagBtnText = { this.state.addToBagBtnText }
            /> <
            Pagination postsPerPage = { this.state.postsPerPage }
            totalPosts = { this.state.books.length }
            paginateNumber = { this.paginate }
            /> <
            /> <
            />
        );
    }
}
export default withRouter(withStyles(useStyles)(Admin));