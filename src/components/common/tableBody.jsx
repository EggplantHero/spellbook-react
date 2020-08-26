import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  state = {
    isToggleOn: true,
    clickedId: "",
  };

  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  handleClick = (id) => {
    if (this.state.isToggleOn) {
      if (id === this.state.clickedId) {
        this.setState({ isToggleOn: false });
      } else {
        this.setState({ clickedId: id });
      }
    } else {
      this.setState({ isToggleOn: true, clickedId: id });
    }
  };

  render() {
    const { data, columns } = this.props;
    const { isToggleOn } = this.state;

    return (
      <tbody>
        {data.map((item) => (
          <React.Fragment key={item._id}>
            <tr onClick={() => this.handleClick(item._id)}>
              {columns.map((column) => (
                <td key={this.createKey(item, column)}>
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
            {item._id === this.state.clickedId && isToggleOn && (
              <tr>
                <td colSpan={columns.length} style={{ borderTop: "none" }}>
                  <p>Description:</p>
                  {item.description || "N/A"}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
