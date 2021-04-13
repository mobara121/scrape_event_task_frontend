import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const TableHeader = ({valueToOrderBy, orderDirection, handleRequestSort}) => {

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property)
    }
    
    return (
        <TableHead>
            <TableRow>
                <TableCell style={{fontSize:'1.0rem', textAlign: 'center'}} key="name">
                    <TableSortLabel
                        active={valueToOrderBy === "name"}
                        direction={valueToOrderBy === "name" ? orderDirection: 'asc' }
                        onClick={createSortHandler("name")}
                    >
                        Event Name
                    </TableSortLabel>
                </TableCell>
                <TableCell style={{fontSize:'1.0rem', textAlign: 'center'}}  key="date">
                    <TableSortLabel
                        active={valueToOrderBy === "date"}
                        direction={valueToOrderBy === "date" ? orderDirection: 'asc' }
                        onClick={createSortHandler("date")}
                    >
                        Date
                    </TableSortLabel>
                </TableCell>
                <TableCell style={{fontSize:'1.0rem', textAlign: 'center'}}  key="location">
                    <TableSortLabel
                        active={valueToOrderBy === "location"}
                        direction={valueToOrderBy === "location" ? orderDirection: 'asc' }
                        onClick={createSortHandler("location")}
                    >
                        Location
                    </TableSortLabel>
                </TableCell>
                <TableCell style={{fontSize:'1.0rem', textAlign: 'center'}}  key="map">
                    <TableSortLabel>
                        Show on the Map
                    </TableSortLabel>
                </TableCell>
                <TableCell style={{fontSize:'1.0rem', textAlign: 'center'}}  key="tel">
                    <TableSortLabel
                        active={valueToOrderBy === "tel"}
                        direction={valueToOrderBy === "tel" ? orderDirection: 'asc' }
                        onClick={createSortHandler("tel")}
                    >
                        TEL
                    </TableSortLabel>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default TableHeader
