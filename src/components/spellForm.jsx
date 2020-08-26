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
      level: "",
      description: "",
      feet: 0,
      minutes: 0,
    },
    schools: [],
    ranges: [{ name: "Feet" }, { name: "Touch" }, { name: "Self" }],
    castTimes: [
      { name: "1 Action" },
      { name: "1 Bonus Action" },
      { name: "1 Reaction" },
      { name: "Minutes" },
    ],
    ranges: ["Feet", "Touch", "Self"],
    castTimes: ["1 Action", "1 Bonus Action", "1 Reaction", "Minutes"],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    schoolId: Joi.string().required().label("School"),
    range: Joi.string().required().label("Range"),
    castTime: Joi.string().required().label("Cast Time"),
    level: Joi.number().min(0).max(9).required().label("Level"),
    description: Joi.string().max(5000).empty("").label("Description"),
    feet: Joi.number().min(0).empty(0).label("Feet"),
    minutes: Joi.number().min(0).empty(0).label("Minutes"),
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
      if (ex.response && ex.response.status === 404)
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
      level: spell.level,
      description: spell.description,
      feet: spell.feet,
      minutes: spell.minutes,
    };
  }

  doSubmit = async () => {
    await saveSpell(this.state.data);

    this.props.history.push("/spells");
  };

  render() {
    const { schools, ranges, castTimes, data } = this.state;
    return (
      <div>
        <h1>Spell Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderSelect("schoolId", "School", schools)}
          {this.renderSelect("range", "Range", ranges)}
          {data.range === "Feet" && this.renderNumInput("feet", "Feet Amount")}
          {this.renderSelect("castTime", "Cast Time", castTimes)}
          {data.castTime === "Minutes" &&
            this.renderNumInput("minutes", "Minutes Amount")}
          {this.renderNumInput("level", "Spell Level", "number")}
          {this.renderTextArea("description", "Description")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default SpellForm;
