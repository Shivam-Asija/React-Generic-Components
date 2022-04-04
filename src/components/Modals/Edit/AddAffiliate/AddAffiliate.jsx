import * as React from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { nanoid } from "nanoid";
import "./AddAffiliate.css";

const StyledModal = styled(ModalUnstyled)`
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

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 500,
  bgcolor: "white",
  borderRadius: "3px",
  // border: "2px solid #000",

  py: 3,
};

export default function AddModal({
  addFormData,
  setrows,
  setAddFormData,
  contacts,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    let affiliateNames = addFormData.affiliateName.split(",");
    const newContact = {
      id: nanoid(),
      UserName: addFormData.username,
      Email: addFormData.email,
      AffliateNames: affiliateNames,
    };
    const newContacts = [...contacts, newContact];
    setrows(newContacts);
  };

  //   const [username, setUsername] = React.useState(row.UserName);
  //   const [email, setEmail] = React.useState(row.Email);

  const headStyle = {
    paddingLeft: "25px",
    display: "inline",
    width: "5em",
  };
  const userBox = {
    paddingLeft: "15px",
  };

  const cancelButton = {
    float: "right",
    color: "#003058",
  };
  const textField = {
    width: "90%",
    margin: "10px",
  };
  const resetButton = {
    margin: "10px",
    height: "2.5em",
    backgroundColor: "#003058",
  };
  const saveCancel = {
    textAlign: "right",
    paddingRight: "35px",
  };
  const save = {
    backgroundColor: "#003058",
    marginRight: "1.5em",
  };
  const cancel = {
    color: "#003058",
    backgroundColor: "#f8f8f8",
  };

  const affiliateNames = [
    {
      id: "All",
      value: "*",
      label: "All",
    },
    {
      id: "1",
      value: "One",
      label: "One",
    },
    {
      id: "2",
      value: "Two",
      label: "Two",
    },
    {
      id: "4",
      value: "Four",
      label: "Four",
    },
  ];

  return (
    <>
      <Button onClick={handleOpen} variant="contained" id="add-affiliate-btn">
        Add Affiliates
      </Button>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <div>
          <Box sx={style}>
            <Typography variant="h4" style={headStyle}>
              ADD
            </Typography>
            <Button onClick={handleClose} style={cancelButton}>
              <CloseIcon />
            </Button>
            <hr />
            <form action="" onSubmit={handleAddFormSubmit}>
              <div style={userBox}>
                <TextField
                  label="Username"
                  name="username"
                  required="required"
                  // placeholder={username}
                  // value={username}
                  style={textField}
                  onChange={handleAddFormChange}
                  // onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div style={userBox}>
                <TextField
                  label="Email"
                  name="email"
                  required="required"
                  // placeholder={email}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  style={textField}
                  onChange={handleAddFormChange}
                />
              </div>
              <div style={userBox}>
                <TextField
                  label="Affiliate Names"
                  name="email"
                  required="required"
                  // placeholder={email}
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  style={textField}
                  onChange={handleAddFormChange}
                />
              </div>
              <div style={userBox}>
                <Button type="submit" variant="contained" style={resetButton}>
                  Reset Password
                </Button>
              </div>
              <hr />
              <div style={saveCancel}>
                <Button type="submit" variant="contained" style={save}>
                  Save
                </Button>
                <Button type="submit" style={cancel} className="cancel">
                  Cancel
                </Button>
              </div>
            </form>
          </Box>
        </div>
      </StyledModal>
    </>
  );
}
