import React from "react";
import {
  withStyles,
  Table,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Tooltip,

  TableCell
} from "material-ui";

import PropTypes from "prop-types";

import tasksStyle from "assets/jss/material-dashboard-react/tasksStyle.jsx";
import { Edit, Close, Check } from "@material-ui/icons";

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor, handleEditClick, handleDeleteClick } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}





            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key}>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}




                <TableCell className={classes.tableActions}>
                  <Tooltip
                    id="tooltip-top"
                    title="تعديل اليانات "
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleEditClick({prop,key})}

                      className={classes.tableActionButton}
                    >
                      <Edit
                        className={
                          classes.tableActionButtonIcon + " " + classes.edit
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top-start"
                    title="الحذف"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton
                      aria-label="Close"
                      onClick={() => handleDeleteClick({ prop, key })}
                      className={classes.tableActionButton}
                    >
                      <Close
                        className={
                          classes.tableActionButtonIcon + " " + classes.close
                        }
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>





              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tasksStyle)(CustomTable);
