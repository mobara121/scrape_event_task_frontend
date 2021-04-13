import React, { useState } from 'react';
import TableHeader from '../TableHead/TableHeader';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import { TableContainer } from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';


function descendingComparator(a,b, orderBy){
    if(b[orderBy] < a[orderBy]){
        return -1
    }
    if(b[orderBy] > a[orderBy]){
        return 1
    }
    return 0
}

function getComparator(order, orderBy){
    return order ==="desc"
        ? (a,b) => descendingComparator(a,b, orderBy)
        : (a,b) => -descendingComparator(a,b, orderBy)
}

const sortedRowInformation = (rowArray, comparator) => {
    const stablizedRowArray = rowArray.map((el, index)=>[el, index])
    stablizedRowArray.sort((a,b)=> {
        const order =comparator(a[0], b[0])
        if(order !==0) return order
        return a[1] - b[1]
    })
    return stablizedRowArray.map((el) => el[0])
}

const TableContent = ({events, geoLocationFetcher}) => {

    const [orderDirection, setOrderDirection] = useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        
        const isAscending = (valueToOrderBy === property && orderDirection === "asc")
        setValueToOrderBy(property)
        setOrderDirection(isAscending ? 'desc' : 'asc')
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value), 5)
        setPage(0)
    }

    return (
        <>
            <TableContainer style={{margin: '2vw, 2vh'}}>
                <Table>
                    <TableHeader 
                        valueToOrderBy={valueToOrderBy}
                        orderDirection={orderDirection}
                        handleRequestSort={handleRequestSort}
                    />
                    {
                        sortedRowInformation(events, getComparator(orderDirection, valueToOrderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event, index)=> (
                            <TableRow key={index}>
                                <TableCell style={{fontSize:'1.0rem'}}  >
                                    <a href={event.link}>{event.event_name}</a>
                                </TableCell>
                                <TableCell style={{fontSize:'1.0rem'}}>
                                    {event.date}
                                </TableCell>
                                <TableCell style={{fontSize:'1.0rem'}}>
                                    {event.location}
                                </TableCell>
                                <TableCell style={{fontSize:'1.0rem'}}>
                                    <MapIcon onClick={()=>geoLocationFetcher(event.location)}/>
                                </TableCell>
                                <TableCell>
                                    {event.tel}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </Table>
            </TableContainer>
            
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={events.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowPerPage}
            />
        </>
    )
}

export default TableContent
