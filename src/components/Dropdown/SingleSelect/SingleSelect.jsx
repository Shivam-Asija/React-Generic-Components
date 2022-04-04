import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import "./SingleSelect.css";

export default function SingleSelect({ FilterData, setSingleSelect }) {
  const handleChange = (event) => {
    console.log("clicked: ", event.target.value);

    setSingleSelect(event.target.value);
  };
  console.log("filterData: ", FilterData);
  return (
    <div className="filter-option">
      <Box sx={{ minWidth: 120, maxWidth: 200 }}>
        <FormControl fullWidth>
          <NativeSelect
            defaultValue={FilterData[0]}
            inputProps={{
              name: "",
              id: "uncontrolled-native",
            }}
            onChange={handleChange}
          >
            {FilterData &&
              FilterData.map((ele) => <option value={ele}>{ele}</option>)}
          </NativeSelect>
        </FormControl>
      </Box>
    </div>
  );
}
