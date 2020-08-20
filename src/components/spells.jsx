import React, { Component } from "react";
import { Link } from "react-router-dom";
import SpellsTable from "./spellsTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getSpells, deleteSpell } from "../services/spellService";
import { getSchools } from "../services/schoolService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Spells extends Component {
  state = {
    spells: [],
    schools: [],
    loaded: false,
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedSchool: null,
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getSchools();
    const schools = [{ _id: "", name: "All Schools" }, ...data];

    const { data: spells } = await getSpells();
    this.setState({ spells, schools, loaded: true });
  }

  handleDelete = async (spell) => {
    const originalSpells = this.state.spells;
    const spells = originalSpells.filter((m) => m._id !== spell._id);
    this.setState({ spells });

    try {
      await deleteSpell(spell._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This spell has already been deleted.");
      this.setState({ spells: originalSpells });
    }
  };

  handleLike = (spell) => {
    const spells = [...this.state.spells];
    const index = spells.indexOf(spell);
    spells[index] = { ...spells[index] };
    spells[index].liked = !spells[index].liked;
    this.setState({ spells });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSchoolSelect = (school) => {
    this.setState({ selectedSchool: school, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedSchool: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedSchool,
      searchQuery,
      spells: allSpells,
    } = this.state;

    let filtered = allSpells;
    if (searchQuery)
      filtered = allSpells.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedSchool && selectedSchool._id)
      filtered = allSpells.filter((m) => m.school._id === selectedSchool._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const spells = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: spells };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: spells } = this.getPagedData();

    const { user } = this.props;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.schools}
            selectedItem={this.state.selectedSchool}
            onItemSelect={this.handleSchoolSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/spells/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Spell
            </Link>
          )}
          {this.state.loaded && (
            <p>Showing {totalCount} spells in your spellbook.</p>
          )}
          {!this.state.loaded && <p>Loading...</p>}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <SpellsTable
            spells={spells}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Spells;
