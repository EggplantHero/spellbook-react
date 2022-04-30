import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import { concat, cardinal } from "../utils/formatter";
import { capitalize } from "../utils/capitalize";

class SpellsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: (spell) => (
        <Link to={`/spells/${spell._id}`}>{capitalize(spell.name)}</Link>
      ),
    },
    { path: "school.name", label: "School" },
    {
      path: "range",
      label: "Range",
      content: (spell) => (
        <p>{concat(spell.feet, spell.range, "Feet", "Foot")}</p>
      ),
    },
    {
      path: "castTime",
      label: "Cast Time",
      content: (spell) => (
        <p>{concat(spell.minutes, spell.castTime, "Minutes", "Minute")}</p>
      ),
    },
    {
      path: "level",
      label: "Level",
      content: (spell) => <p>{cardinal(spell.level)}</p>,
    },
    {
      key: "delete",
      content: (spell) => (
        <button
          onClick={() => this.props.onDelete(spell)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

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
