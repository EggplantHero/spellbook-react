import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getSpell, saveSpell } from "../services/spellService";
import { getSchools } from "../services/schoolService";

class SpellForm extends Form {
  state = {
    data: {
      name: "",
      schoolId: "",
      range: "",
      castTime: "",
    },
    schools: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    schoolId: Joi.string().required().label("School"),
    range: Joi.number().required().min(0).label("Range"),
    castTime: Joi.number().required().min(0).label("Cast Time"),
  };

  async populateSchools() {
    const { data: schools } = await getSchools();
    this.setState({ schools });
  }

  async populateSpell() {
    try {
      const spellId = this.props.match.params.id;
      if (spellId === "new") return;

      const { data: spell } = await getSpell(spellId);
      this.setState({ data: this.mapToViewModel(spell) });
    } catch (ex) {
      if (
        ex.response
        // && ex.response.status === 404
      )
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateSchools();
    await this.populateSpell();
  }

  mapToViewModel(spell) {
    return {
      _id: spell._id,
      name: spell.name,
      schoolId: spell.school._id,
      range: spell.range,
      castTime: spell.castTime,
    };
  }

  doSubmit = async () => {
    await saveSpell(this.state.data);

    this.props.history.push("/spells");
  };

  render() {
    return (
      <div>
        <h1>Spell Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect("schoolId", "School", this.state.schools)}
          {this.renderInput("range", "Range", "number")}
          {this.renderInput("castTime", "Cast Time", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default SpellForm;
