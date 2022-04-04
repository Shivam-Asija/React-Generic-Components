import React, { useEffect } from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchBar from "material-ui-search-bar";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { nanoid } from "nanoid";
import TextField from "@mui/material/TextField";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import MultiSelect from "../../Filter/ComboBox/MultiSelect";
import DoneIcon from "@mui/icons-material/Done";
import $ from "jquery";

import "./AdminDataTable.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SearchStyle = {
  width: "35%",
  marginBottom: "1em",
};

const gridStyle = {
  backgroundColor: "#F8F8F8",
};

function Row({ row, rows, setrows, userData }) {
  const [open, setOpen] = React.useState(false);
  const header = rows[0] && Object.keys(rows[0]);

  //////////////////////////////////////// DELETE ROW CODE /////////////////////////////////////////////////////////////

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const StyledModalDelete = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const BackdropDelete = styled("div")`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

  const styleDeleteBox = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "white",
    backgroundColor: "white",
    boxShadow: 24,
    borderRadius: "3px",
    p: 4,
  };
  const DelHead = {
    padding: "10px 25px",
    fontSize: "20px",
    fontWeight: "bold",
    paddingLeft: "25px",
    display: "inline",
    width: "5em",
  };
  const cancelButtonDelete = {
    float: "right",
    color: "#003058",
    fontSize: "14px",
    padding: "0px",
  };
  const headComponets = {
    margin: "15px 0",
  };
  const hrTag = {
    margin: "0",
  };
  const confirmDetails = {
    padding: "10px 25px",
    fontSize: "16.5px",
  };
  const delButtons = {
    float: "right",
    paddingRight: "25px",
    margin: "10px 0",
  };
  const delCancelButton = {
    padding: "5px",
    marginRight: "1.5em",
    color: "#003058",
    backgroundColor: "#f8f8f8",
  };
  const delConfirmButton = {
    padding: "5px",
    backgroundColor: "#003058",
    color: "white",
    marginRight: "1em",
  };

  const deleteRow = async (Email) => {
    let newData = rows.filter((row) => {
      return row.Email !== Email;
    });
    const deleteData = rows.filter((row) => {
      return row.Email === Email;
    });
    let deleteID = deleteData[0].AppUserID.toString();
    console.log("newDataaa: ", deleteID);
    setrows(newData);
    const data = await fetch(
      "https://localhost:44387/api/UserAffiliateManage/DeleteUser",
      {
        method: "POST",
        body: deleteID,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json-patch+json",
        },
      }
    );
    const result = await data.json();
    console.log("result", result);
    console.log("data", data);
  };

  ////////////////////////////////////////////// EDIT CODE //////////////////////////

  const StyledModalEdit = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const BackdropEdit = styled("div")`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

  const styleEdit = {
    width: 500,
    bgcolor: "white",
    borderRadius: "3px",
    py: 3,
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [username, setUsername] = useState(row.UserName);
  const [email, setEmail] = useState(row.Email);

  const [openGeneratePassword, setOpenGeneratePassword] = useState(false);

  const headStyleEdit = {
    paddingLeft: "25px",
    display: "inline",
    width: "5em",
  };
  const userBoxEdit = {
    paddingLeft: "15px",
  };

  const cancelButtonEdit = {
    float: "right",
    color: "#003058",
  };
  const textFieldEdit = {
    width: "90%",
    margin: "10px",
  };
  const resetButtonEdit = {
    margin: "10px",
    height: "2.5em",
    backgroundColor: "#003058",
  };
  const saveCancelEdit = {
    textAlign: "right",
    paddingRight: "35px",
  };
  const saveEdit = {
    backgroundColor: "#003058",
    marginRight: "1.5em",
  };
  const cancelEdit = {
    color: "#003058",
    backgroundColor: "#f8f8f8",
  };
  const editData = () => {
    let newRows = rows;
    let headervalue = {
      UserID: row.AppUserID,
      UserName: username,
      Email: email,
      Password: "newPassword",
      IsNewPassword: true,
      AffiliateName: row.AffiliateName,
      UserEmail: userData.Email,
    };
    fetch(
      "https://localhost:44387/api/UserAffiliateManage/UpdateUserAffiliates",
      {
        method: "POST",
        headers: {
          UserAffiliateFilter: JSON.stringify(headervalue),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("edit DAta: ", data));
    newRows.map((obj) => {
      if (obj.Email === row.Email) {
        obj.UserName = username;
        obj.Email = email;
      }
    });
    setrows(newRows);
    handleCloseEdit();
  };
  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {header &&
          header.map((col) => (
            <>
              {!row === null ? (
                <StyledTableCell>
                  {typeof row[col] === "string" ? row[col] : row[col][0]}
                  {row[col].length > 1 && typeof row[col] !== "string" ? (
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  ) : (
                    ""
                  )}
                </StyledTableCell>
              ) : (
                <StyledTableCell>
                  {Array.isArray(row[col]) && row[col].length > 1 ? (
                    <>
                      {row[col][0]}
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>{" "}
                    </>
                  ) : col !== "AppUserID" ? (
                    row[col]
                  ) : (
                    ""
                  )}
                  {/* {typeof row[col] === Array ? row[col][0] : row[col]} */}
                </StyledTableCell>
              )}
            </>
          ))}
        <StyledTableCell>
          <Button onClick={handleOpenEdit}>
            <EditIcon />
          </Button>
          <StyledModalEdit
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={openEdit}
            onClose={handleCloseEdit}
            BackdropComponent={BackdropEdit}
          >
            <div>
              <Box sx={styleEdit}>
                <Typography variant="h4" style={headStyleEdit}>
                  Edit
                </Typography>
                <Button onClick={handleCloseEdit} style={cancelButtonEdit}>
                  <CloseIcon />
                </Button>
                <hr />
                <div style={userBoxEdit}>
                  <TextField
                    label="Username"
                    name="username"
                    required="required"
                    placeholder={username}
                    value={username}
                    style={textFieldEdit}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div style={userBoxEdit}>
                  <TextField
                    label="Email"
                    name="email"
                    required="required"
                    placeholder={email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={textFieldEdit}
                  />
                </div>
                <div style={userBoxEdit}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={resetButtonEdit}
                    onClick={() => setOpenGeneratePassword(true)}
                  >
                    Reset Password
                  </Button>
                </div>
                <hr />
                <div style={saveCancelEdit}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={saveEdit}
                    onClick={editData}
                  >
                    Save
                  </Button>
                  <Button type="submit" style={cancelEdit} className="cancel">
                    Cancel
                  </Button>
                </div>
              </Box>
            </div>
          </StyledModalEdit>
          <Button onClick={handleOpenDelete}>
            <DeleteIcon />
          </Button>
          <StyledModalDelete
            open={openDelete}
            onClose={handleCloseDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            BackdropComponent={BackdropDelete}
          >
            <div>
              <Box style={styleDeleteBox}>
                <div style={headComponets}>
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h4"
                    style={DelHead}
                  >
                    Delete User
                  </Typography>
                  <Button
                    onClick={handleCloseDelete}
                    style={cancelButtonDelete}
                  >
                    <CloseIcon />
                  </Button>
                </div>

                <hr style={hrTag} />
                <Typography variant="h6" style={confirmDetails}>
                  Are you sure you want to delete the user{" "}
                  <b> {row.UserName} </b>
                  with the <b> {row.Email} </b>
                  email ?
                </Typography>
                <Typography variant="h6" style={confirmDetails}>
                  All information associated to this user will be deleted.
                </Typography>
                <hr style={hrTag} />
                <div style={delButtons}>
                  <Button
                    onClick={handleCloseDelete}
                    style={delCancelButton}
                    className="delCancelButton"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => deleteRow(row.Email)}
                    style={delConfirmButton}
                  >
                    Ok
                  </Button>
                </div>
              </Box>
            </div>
          </StyledModalDelete>
        </StyledTableCell>
      </StyledTableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography gutterBottom component="div">
                {header &&
                  header.map((col) =>
                    Array.isArray(row[col])
                      ? row[col].map((ele) => `${ele}, `)
                      : ""
                  )}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({
  data,
  dataChanged,
  setDataChanged,
  userData,
}) {
  const [rows, setrows] = useState(data);
  const [searched, setSearched] = useState("");
  const [affiliateArray, setAffiliateArray] = useState([]);

  console.log("rows: ", data);

  ////////////////////////////////////////////////////// GET AFFILIATE CODE START ///////////////////////////////////////////////
  const affArray = [
    {
      id: "All",
      value: "*",
      label: "All",
    },
  ];
  useEffect(() => {
    fetch("https://localhost:44387/api/UserAffiliateManage/GetAffiliates")
      .then((res) => res.json())
      .then((data) =>
        data.map((obj) => {
          affArray.push({
            id: obj.ID,
            value: obj.AffiliateName,
            label: obj.AffiliateName,
          });
        })
      );
    setAffiliateArray(affArray);
  }, []);
  ////////////////////////////////////////////////////// GET AFFILIATE CODE END ///////////////////////////////////////////////

  let Header = [];
  if (rows && rows.length > 1) {
    Header = rows[0] && Object.keys(rows[0]);
  }

  const requestSearch = (searchedVal) => {
    const filteredRows = data.filter((row) => {
      return (
        row.UserName.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.Email.toString().includes(searchedVal)
      );
    });

    setrows(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const tablepagination = {
    color: "white",
  };

  ///////////////////////////////////Add Affiliate Code//////////////////////////////////////////

  const [openAdd, setOpenAdd] = React.useState(false);
  const [selectedAffiliates, setSelectedAffiliates] = useState([]);
  const handleOpenAdd = () => {
    setOpenAdd(true);
    setPassCopied(false);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setPassword({});
  };

  const headStyleAdd = {
    paddingLeft: "25px",
    display: "inline",
    width: "5em",
  };
  const cancelButtonAdd = {
    float: "right",
    color: "#003058",
  };

  const [addFormData, setAddFormData] = useState({});

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const affiliateNames = [];
    selectedAffiliates.map((obj) => {
      affiliateNames.push(obj.value);
    });

    if (affiliateNames[0] === "*") {
      affiliateNames.shift();
    }

    console.log("password ", password);

    const headervalue = {
      UserName: addFormData.username,
      Email: addFormData.email,
      Password: password.data,
      IsNewPassword: false,
      AffiliateName: affiliateNames,
      UserEmail: addFormData.email,
    };
    fetch(
      "https://localhost:44387/api/UserAffiliateManage/SaveUserAffiliates",
      {
        method: "POST",
        headers: {
          UserAffiliateFilter: JSON.stringify(headervalue),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("newData: ", data))
      .then(
        setTimeout(() => {
          fetch(
            "https://localhost:44387/api/UserAffiliateManage/GetUserAffiliates"
          )
            .then((response) => response.json())
            .then((newData) => {
              newData.map((obj) => {
                if (obj.AffiliateName !== null) {
                  obj.AffiliateName = obj.AffiliateName.split(",");
                }
              });
              console.log("Added rows", newData);
              setAffiliateArray(affiliateNames);

              setrows(newData);
            });
        }, 2000)
      );

    // console.log("data: ", affiliateNames);

    // const newContact = {
    //   id: nanoid(),
    //   UserName: addFormData.username,
    //   Email: addFormData.email,
    //   AffliateName: affiliateNames,
    // };
    // const newContacts = [...rows, newContact];
    // console.log("newContact", newContact);
    // setrows(newContacts);
    handleCloseAdd();
  };
  const styleAdd = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const textFieldAdd = {
    width: "90%",
    margin: "10px",
    marginBottom: "1em",
  };

  const styleBtnAdd = {
    float: "right",
  };
  const styleBtnColor = {
    backgroundColor: "#003058",
  };

  const btnCancelAdd = {
    marginLeft: "2em",
  };

  const passwordinput = {
    marginTop: "1em",
    marginBottom: "1em",
    width: "21em",
    marginRight: "0.3em",
  };

  const passCopyBtn = {
    backgroundColor: "#003058",
  };

  ////////////////////////////// Generate Password Code /////////////////////////////////
  const [passCreated, setPassCreated] = useState(false);
  const [passCopied, setPassCopied] = useState(false);
  const [password, setPassword] = useState({});

  const url =
    "https://passwordinator.herokuapp.com/generate?num=true&caps=true&char=true&len=8";
  const fetchAPI = () => {
    console.log("password: ", password);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPassword(data);
        console.log("password: ", password);
      });
    setPassCreated(true);
    $(".password-input").css("display", "block");
  };

  const copyPassword = () => {
    setPassCopied(true);
    $(".passwordCopyBtn").css("display", "none");
  };

  return (
    <Paper style={gridStyle}>
      {/* ////////////////////////////////////// Add Modal Code /////////////////////////////////////////////////////// */}

      <>
        <div>
          <Button
            onClick={handleOpenAdd}
            variant="contained"
            id="add-affiliate-btn"
          >
            Add Affiliates
          </Button>
          <Modal
            open={openAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleAdd}>
              <Typography variant="h4" style={headStyleAdd}>
                Add
              </Typography>
              <Button onClick={handleCloseAdd} style={cancelButtonAdd}>
                <CloseIcon />
              </Button>
              <hr />
              <form action="" onSubmit={handleAddFormSubmit}>
                <TextField
                  helperText=" "
                  id="demo-helper-text-aligned-no-helper"
                  label="Username"
                  name="username"
                  required={true}
                  placeholder="Username"
                  style={textFieldAdd}
                  onChange={handleAddFormChange}
                />
                <TextField
                  helperText=" "
                  id="demo-helper-text-aligned-no-helper"
                  label="Email"
                  name="email"
                  required={true}
                  placeholder="Email"
                  style={textFieldAdd}
                  onChange={handleAddFormChange}
                />
                <MultiSelect
                  style={textFieldAdd}
                  affiliateNames={affiliateArray}
                  setSelectedAffiliates={setSelectedAffiliates}
                />

                <div className="password-input">
                  <input
                    type="text"
                    value={password.data}
                    style={passwordinput}
                  />
                  {passCopied ? <DoneIcon className="passCopiedIcon" /> : ""}

                  <Button
                    className="passwordCopyBtn"
                    variant="contained"
                    style={passCopyBtn}
                    onClick={copyPassword}
                  >
                    Copy
                  </Button>
                </div>
                <Button
                  variant="contained"
                  style={styleBtnColor}
                  onClick={() => fetchAPI()}
                >
                  Create Password
                </Button>
                <hr />

                <div style={styleBtnAdd}>
                  {passCreated ? (
                    <Button
                      type="submit"
                      style={styleBtnColor}
                      variant="contained"
                      className="saveNewAffiliateBtn"
                    >
                      Save
                    </Button>
                  ) : (
                    ""
                  )}

                  <Button
                    onClick={handleCloseAdd}
                    style={btnCancelAdd}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
      </>
      <SearchBar
        id="admin-search"
        placeholder="Type to filter the UserName and Email columns"
        value={searched}
        style={SearchStyle}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <TableContainer style={gridStyle} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {Header &&
                Header.map((ele) => (
                  <StyledTableCell>
                    {ele !== "Detail" && ele !== "AppUserID" ? ele : ""}
                  </StyledTableCell>
                ))}
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row
                  key={row.Email}
                  row={row}
                  rows={rows}
                  setrows={setrows}
                  userData={userData}
                />
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 63 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          style={tablepagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
}
