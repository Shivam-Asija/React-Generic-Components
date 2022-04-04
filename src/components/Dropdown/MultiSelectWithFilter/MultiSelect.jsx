import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import "./MultiSelect.css";
import options from "./data";

const MultiSelectAll = ({ affiliateNames, setSelectedAffiliates }) => {
  const [selectedOptions, setSelectedOptions] = useState(affiliateNames);

  console.log("selectedOptions", selectedOptions);

  useEffect(() => {
    setSelectedOptions(affiliateNames);
    setSelectedAffiliates(affiliateNames);
  }, [affiliateNames]);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
  }

  return (
    <div className="multi-select">
      {affiliateNames !== [] && (
        <ReactMultiSelectCheckboxes
          options={affiliateNames}
          placeholderButtonLabel="Affiliates"
          getDropdownButtonLabel={getDropdownButtonLabel}
          value={selectedOptions}
          onChange={onChange}
          setState={setSelectedOptions}
        />
      )}
    </div>
  );
};

export default MultiSelectAll;
