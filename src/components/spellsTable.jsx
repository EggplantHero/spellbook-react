import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import auth from "../services/authService";

class SpellsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (spell) => <Link to={`/spells/${spell._id}`}>{spell.name}</Link>,
    },
    { path: "school.name", label: "School" },
    { path: "range", label: "Range" },
    { path: "castTime", label: "Cast Time" },
  ];

  deleteColumn = {
    key: "delete",
    content: (spell) => (
      <button
        onClick={() => this.props.onDelete(spell)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { spells, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={spells}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default SpellsTable;
