// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDocuments, fetchDocumentDetail, downloadDocumentFile } from '../../actions/adminActions';
// import { useNavigate, Link } from 'react-router-dom';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Typography,
//   TextField,
//   InputAdornment,
//   IconButton,
//   FormControl,
//   Select,
//   MenuItem,
//   FormControlLabel,
//   Checkbox,
// } from '@mui/material';
// import {
//   Search as SearchIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
// } from '@mui/icons-material';
// import './DocumentsList.css';

// const DocumentsList = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');
//   const [sortBy, setSortBy] = useState('createdAt'); // Default sort by createdAt
//   const [page, setPage] = useState("");
//   const { metaData, documents, loading } = useSelector(state => state.admin);

//   useEffect(() => {
//     dispatch(fetchDocuments());
//   }, [dispatch]);

//   const handleDocumentClick = (id) => {
//     dispatch(fetchDocumentDetail(id));
//     navigate(`/admin/documents/${id}`);
//   };

//   const handleDownloadFile = (id) => {
//     dispatch(downloadDocumentFile(id));
//   };

//   const handleSearch = () => {
//     // Handle search logic here, if required
//     console.log("Search term:", searchTerm);
//   };

//   const handlePostDocument = () => {
//     navigate('/admin/documents/post');
//   };

//   const handleSortChange = (event) => {
//     const { value } = event.target;
//     setSortBy(value);
//   };

//   const handleSortOrderChange = () => {
//     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//   };

//   const sortedDocuments = documents.sort((a, b) => {
//     const order = sortOrder === 'asc' ? 1 : -1;
//     return order * (new Date(a[sortBy]) - new Date(b[sortBy]));
//   });

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="documents-list">
//       <Typography variant="h4" align="center" gutterBottom>
//         All Documents
//       </Typography>
//       <Button onClick={handlePostDocument} className="post-document-button" variant="contained" color="primary">
//         Post Document
//       </Button>
//       <div className="documents-toolbar">
//         <TextField
//           className="search-input"
//           label="Search"
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={handleSearch}>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//         <div className="sort-by-container">
//           <Typography variant="body1" className="sort-by-label">
//           </Typography>
//           <FormControl variant="outlined" className="sort-by-select">
//             <Select
//               value={sortBy}
//               onChange={handleSortChange}
//               displayEmpty
//               inputProps={{ 'aria-label': 'Sort By' }}
//             >
//               <MenuItem value="createdAt">Date</MenuItem>
//               {/* Add more options if needed */}
//             </Select>
//             <IconButton onClick={handleSortOrderChange}>
//               {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
//             </IconButton>
//           </FormControl>
//         </div>
//       </div>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>Subject</strong></TableCell>
//               <TableCell><strong>Description</strong></TableCell>
//               <TableCell align="center"><strong>File</strong></TableCell>
//             </TableRow>
//           </TableHead> s
//           <TableBody>
//             {sortedDocuments.map(document => (
//               <TableRow key={document._id} className="document-item" onClick={() => handleDocumentClick(document._id)}>
//                 <TableCell>{document.name}</TableCell>
//                 <TableCell>{document.description && document.description.length > 10 ? document.description.split(" ").slice(0, 20).join(" ") : document.description}...</TableCell>
//                 <TableCell align="center">{document.filePath && (
//                   <Button onClick={() => handleDownloadFile(document._id)} variant="outlined">Download</Button>
//                 )}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {metaData && metaData.pagination && (
//         <div className="pagination">
//           {metaData.pagination.page > 1 && (
//             <Button onClick={() => setPage(prevPage => prevPage - 1)} variant="outlined">Previous</Button>
//           )}
//           <span>Page {metaData.pagination.page} of {metaData.pagination.pages}</span>
//           {metaData.pagination.page < metaData.pagination.pages && (
//             <Button onClick={() => setPage(prevPage => prevPage + 1)} variant="outlined">Next</Button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentsList;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocuments, fetchDocumentDetail, downloadDocumentFile } from '../../actions/adminActions';
import { useNavigate, Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import './DocumentsList.css';
import Message from '../Message'


const DocumentsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('createdAt'); // Default sort by createdAt
  const { metaData, documents, loading,error } = useSelector(state => state.document);
  const [page, setPage] = useState("")
  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const handleDocumentClick = (id) => {
    dispatch(fetchDocumentDetail(id));
    navigate(`/admin/documents/${id}`);
  };

  // const handleDownloadFile = (id, event) => {
  //   // Prevent event propagation to parent elements
  //   event.stopPropagation();
  //   dispatch(downloadDocumentFile(id,metaData));
  // };

  const handleSearch = () => {
    // Handle search logic here, if required
    console.log("Search term:", searchTerm);
  };

  const handlePostDocument = () => {
    navigate('/admin/documents/post');
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortBy(value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedDocuments = documents.sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    return order * (new Date(a[sortBy]) - new Date(b[sortBy]));
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="documents-list">
    {error && <Message variant="danger">{error.message}</Message>}

      <Typography variant="h4" align="center" gutterBottom>
        All Documents
      </Typography>
      <Button onClick={handlePostDocument} className="post-document-button" variant="contained" color="primary">
        Post Document
      </Button>
      <div className="documents-toolbar">
        {/* <TextField
          className="search-input"
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
        {/* <div className="sort-by-container">
          <Typography variant="body1" className="sort-by-label">
            Sort By:
          </Typography>
          <FormControl variant="outlined" className="sort-by-select">
            <Select
              value={sortBy}
              onChange={handleSortChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Sort By' }}
            >
              <MenuItem value="createdAt">Date</MenuItem>
            </Select>
            <IconButton onClick={handleSortOrderChange}>
              {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            </IconButton>
          </FormControl>
        </div> */}
      </div>
      {metaData && metaData.pagination && (
        <Pagination className="pagination">
          {metaData.pagination.page > 1 && (
            <Pagination.Prev onClick={() => setPage(prevPage => prevPage - 1)}>Previous</Pagination.Prev>
          )}
          <Pagination.Item active>{`Page ${metaData.pagination.page} of ${metaData.pagination.pages}`}</Pagination.Item>
          {metaData.pagination.page < metaData.pagination.pages && (
            <Pagination.Next onClick={() => setPage(prevPage => prevPage + 1)}>Next</Pagination.Next>
          )}
        </Pagination>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Subject</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              {/* <TableCell align="center"><strong>File</strong></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDocuments.map(document => (
              <TableRow key={document._id} className="document-item">
                <TableCell onClick={() => handleDocumentClick(document._id)}>{document.name}</TableCell>
                <TableCell onClick={() => handleDocumentClick(document._id)}>
                  {document.description && document.description.length > 10
                    ? `${document.description.split(" ").slice(0, 20).join(" ")}...`
                    : document.description}
                </TableCell>
                {/* <TableCell align="center">
                  {document.filePath && (
                    <Button onClick={(event) => handleDownloadFile(document._id, event)} variant="outlined">Download</Button>
                  )}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {metaData && metaData.pagination && (
        <div className="pagination">
          {metaData.pagination.page > 1 && (
            <Button variant="outlined" onClick={() => setPage(prevPage => prevPage - 1)}>Previous</Button>
          )}
          <span>Page {metaData.pagination.page} of {metaData.pagination.pages}</span>
          {metaData.pagination.page < metaData.pagination.pages && (
            <Button variant="outlined" onClick={() => setPage(prevPage => prevPage + 1)}>Next</Button>
          )}
        </div>
      )} */}
    </div>
  );
};

export default DocumentsList;
