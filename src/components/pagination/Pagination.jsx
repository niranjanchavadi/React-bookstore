import React, { Component } from 'react';
import "./pagination.css";
import Pagination from '@material-ui/lab/Pagination';
class Pagination1 extends Component {
paginate=(event, value) =>{
// console.log("page number", value);
alert( value);

// this.props.paginateNumber(pageNumber)
}

render() {
const pageNumbers = [];
for (let index = 1; index <= Math.ceil(this.props.totalPosts / this.props.postsPerPage); index++) {
pageNumbers.push(index);
}

return (
<nav className="pagination-nav" id='pagination'>
<div className='pagination'>
{
pageNumbers.map(number => (
<div>
<Pagination showFirstButton showLastButton count={Math.ceil(this.props.totalPosts / 8)} 
// anothercount={Math.ceil(this.props.totalPosts / 8)}
onClick={() => this.paginate}/>
</div>
))}
</div>
</nav>
);
}
}
export default Pagination1;