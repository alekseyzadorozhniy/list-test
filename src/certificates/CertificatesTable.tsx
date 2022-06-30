import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { CertificatesMeta, CertificateWithFavorite } from "./types";

import './CertificatesTable.css';

type CertificatesTableProps = {
    certificates: CertificateWithFavorite[] ;
    meta: CertificatesMeta | null;
    fetchCertificates: (page: number, count: number) => void;
    handleFavorite: (id: string, add: boolean) => void;
}

const CertificatesTable: React.FC<CertificatesTableProps> = ({ certificates, meta, fetchCertificates, handleFavorite }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        fetchCertificates(newPage + 1, rowsPerPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rowsPerPageCalculated = parseInt(event.target.value, 10);
        setRowsPerPage(rowsPerPageCalculated);
        setPage(0);
        fetchCertificates(1, rowsPerPageCalculated);
    };

    const handleClickOnUniqueNumber = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Unique ID</TableCell>
                            <TableCell align="left">Originator</TableCell>
                            <TableCell align="left">Originator Country</TableCell>
                            <TableCell align="left">Owner</TableCell>
                            <TableCell align="left">Owner Country</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {certificates && certificates.map((row) => (
                            <TableRow
                                key={row.uniqueNumber}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Tooltip title="Click to copy the certificate ID">
                                        <span
                                            className="clickable"
                                            onClick={() => handleClickOnUniqueNumber(row.uniqueNumber)}
                                        >
                                            {row.uniqueNumber}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="left">{row.companyName}</TableCell>
                                <TableCell align="left">{row.countryCode}</TableCell>
                                <TableCell align="left">
                                    {row.carbonCertificateOwnerAccount.carbonUser.company.name}
                                </TableCell>
                                <TableCell align="left">
                                    {row.carbonCertificateOwnerAccount.carbonUser.company.address.country}
                                </TableCell>
                                <TableCell align="left">{row.status}</TableCell>
                                <TableCell align="left">
                                    {
                                        row.favorite
                                            ? <BookmarkIcon className="clickable" onClick={() => handleFavorite(row.uniqueNumber, false)} />
                                            : <BookmarkBorderIcon className="clickable" onClick={() => handleFavorite(row.uniqueNumber, true)}/>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {meta && <TablePagination
                rowsPerPageOptions={[10, 20]}
                component="div"
                count={meta.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
        </Paper>
    );
}

export default CertificatesTable;
