import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/react";
import "./MUIDatatable.css";

// const columns = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "firstName",
//     headerName: "First name",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "lastName",
//     headerName: "Last name",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 110,
//     editable: true,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
// ];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function DataGridDemo({ data, headers }) {
  const [pageSize, setPageSize] = useState(10);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={headers}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 100]}
        pagination
        components={{
          Toolbar: CustomToolbar,
        }}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(row) => Math.random().toString(16).slice(2)}
        onCellClick={(params, event) => {
          if (!event.ctrlKey) {
            event.defaultMuiPrevented = true;
            // console.log(params.row);
          }
        }}
        {...data}
        onSelectionChange={(params, event) => {
          console.log("jdfnjd");
        }}
      />
    </div>
  );
}
