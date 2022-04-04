import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-dt/js/dataTables.dataTables.min.js";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";

let selectedRows = [];

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function DataTable({ data, path, submitButton }) {
  const [requestData, setRequestData] = useState({});

  const columns = data[0] && Object.keys(data[0]);
  if (columns && columns.length > 6 && window.innerWidth < 1500) {
    $("table").css("display", "block");
  } else if (columns && columns.length > 12) {
    $("table").css("display", "block");
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      $("#example tfoot th").each(function () {
        $(this).html(
          '<input style="text-align: center" type="text" placeholder="Search" />'
        );
      });

      $(".edit-column").find("input").css("display", "none");

      $(document).ready(function () {
        $(".sorting:last-child").removeClass("sorting");
      });
      $("body").on("click", function () {
        $(".sorting:last-child").removeClass("sorting");
      });

      // DataTable
      var table = $("#example").DataTable({
        columnDefs: [
          {
            orderable: false,
            className: "select-checkbox",
            targets: 0,
          },
        ],
        select: {
          style: "multi",
          selector: "td:first-child",
        },
        order: [[1, "asc"]],
        dom: "plBfrtip",
        buttons: ["copy", "csv", "excel", "pdf", "print"],
      });
      // }

      $("#example tbody").on("click", ".edit-button", function () {
        $(this).closest("tr").addClass("edit-row");
        let editRow = table.rows(".edit-row").data()[0];
        let tableHead = [];

        $("#example > thead > tr > th").each(function () {
          tableHead.push($(this).text());
        });
        editRow.shift();
        editRow.pop();
        tableHead.shift();
        tableHead.pop();
        let editData = [];
        editData.push(tableHead);
        editData.push(editRow);
        let finalData = {};
        for (let i = 0; i < editData[0].length; i++) {
          let key = editData[0][i];
          let value = editData[1][i];
          finalData[key] = value;
        }
        setRequestData(finalData);
      });
      $("#example tbody").on("click", "td.select-checkbox", function () {
        $(this).parent("tr").toggleClass("selected");
        selectedRows = table.rows(".selected").data();
        $("#row-count").html(" : " + table.rows(".selected").data().length);
      });
      // Apply the search
      table
        .columns()
        .eq(0)
        .each(function (colIdx) {
          $("input", table.column(colIdx).footer()).on(
            "keyup change",
            function () {
              table.column(colIdx).search(this.value).draw();
            }
          );
        });
    }, 1500);

    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      $(".table-container").css("display", "block");
      $(".spinner-container").css("display", "none");
    }, 1500);
    return () => clearTimeout(timer);
  }, [data]);
  console.log("requestData: ", requestData);

  return (
    <div className="table-data-container">
      <div className="spinner-container">
        {/* <Watch id="spinner" color="#00BFFF" height={80} width={80} /> */}
        <RingLoader
          id="spinner"
          color="#2CD1BE"
          loading={true}
          css={override}
          size={150}
        />
      </div>
      <div className="table-container">
        <table id="example" className="table table-light table-striped">
          <thead>
            <tr className="th-sm">
              <th>Select</th>
              {data[0] && columns.map((heading) => <th>{heading}</th>)}
              <th>Action</th>
            </tr>
          </thead>
          <tfoot style={{ display: "table-header-group" }}>
            <tr>
              <th className="checkbox-header">Select</th>
              {data[0] && columns.map((heading) => <th>{heading}</th>)}
              <th className="edit-column"></th>
            </tr>
          </tfoot>
          <tbody>
            {data.map((row) => (
              <tr>
                <td></td>
                {columns.map((column) => (
                  <td>{row[column]}</td>
                ))}
                <td>
                  <NavLink
                    className="edit-button"
                    to={{
                      pathname: "Request",
                      state: { requestData, path },
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div class="d-md-flex justify-content-between text-right col-md-12 align-items-center flex-row-reverse py-0 my-4 submit-approval-div">
          <p class="text-light py-0 my-0 w-25">
            <input
              type="submit"
              name="SubmitApprovals"
              value={
                submitButton === "Reset Records"
                  ? "Reset Record"
                  : "Submit Approvals"
              }
              class=" submit-approval reset-records btn btn-warning text-center w-75 my-2 shadow"
              id={
                submitButton === "resetRecords"
                  ? "Reset Record"
                  : "submitApprovals"
              }
            />
          </p>
        </div>
      </div>
    </div>
  );
}
