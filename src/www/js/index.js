import React from 'react';
import ReactDOM from 'react-dom';
import * as utilities from "./utilities.js";
import raceData from '../json/races.json';
import { CharacterSheet } from './character-sheet.js';
import { DropDown } from './form-fields/drop-down.js';
import { TextInput } from './form-fields/text-input.js';
import { SubmitButton } from './form-fields/submit-button.js';
import { RaceForm } from './forms/race-form.js';
import { ClassForm } from './forms/class-form.js';
import { BiographyForm } from './forms/character-biography-form.js';
import { BackgroundForm } from './forms/background-form.js';
import { AbilityScoresForm } from './forms/ability-scores-form.js';
import { CharacterDetailsForm } from './forms/character-details-form.js';
import { SkillsForm } from './forms/skills-form.js';


class DndForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charData : {}
    };

    this.update = this.update.bind(this);
    this.getRaceDescription = this.getRaceDescription.bind(this);
  }

  update(e) {
    let newCharData = {};
    let raceName = "";
    let thisCharData = {};
    let thisSubRaceData = {};

    if (e.target.name.indexOf('ability_score_increase') > -1) {
      newCharData = this.getAbilityScoreIncrease(e);
    } else {
      newCharData = Object.assign({},this.state.charData,{[e.target.name]:e.target.value});
    }

    if (document.querySelector('select_race')) {
        thisCharData = utilities.getObjectByName(raceData, e.target.name) || utilities.getObjectByName(raceData, document.querySelector('select_race').value);
        newCharData.proficiencies = thisCharData.proficiencies;
    }

    if (document.querySelector('select_subrace')) {
        thisSubRaceData = utilities.getObjectByName(raceData, e.target.name);
        newCharData.proficiencies = thisCharData.proficiencies;
    }

    this.setState({
      charData : Object.assign({},this.state.charData,newCharData)
    });
  }

  getThisRaceData() {
    let raceName = this.state.charData.select_race;
    let thisRaceData = utilities.getObjectByName(raceData,raceName);

    return thisRaceData;
  }

  getAbilityScoreIncrease(e) {
    let abilityScoreIncreaseIndex = e.target.name.indexOf('ability_score_increase');
    let abilityScoreIncrease = this.state.charData.ability_score_increase;
    let abilityScore = "";
    let abilityScoreValue = 0;
    let newAbilityScoreIncreases = {};
    let newCharData = {};

    if (abilityScoreIncreaseIndex > -1) {
      if (e.target.checked) {
        abilityScoreValue = e.target.value;
      }
      abilityScore = e.target.name.substring("ability_score_increase_".length,e.target.name.length);
      newAbilityScoreIncreases = Object.assign({},abilityScoreIncrease,{[abilityScore] : abilityScoreValue});
      newCharData = Object.assign({},this.state.charData,{"ability_score_increase" : newAbilityScoreIncreases});
    }

    return newCharData;
  }

  updateSelectedProficiencies(e) {
    let arrayIndex = 0;
    this.state.charData[e.target.name] = this.state.charData[e.target.name] || [];

    if (this.state.charData[e.target.name]) {
      arrayIndex = this.state.charData[e.target.name].indexOf(e.target.value);
      if (e.target.checked) {
        this.state.charData[e.target.name].push(e.target.value);
      } else {
        if (arrayIndex > -1) {
          this.state.charData[e.target.name].splice(arrayIndex, 1);
        }
      }
    }
  }

  getRaceDescription(prop) {
    let selectedRace = "";
    let thisRaceData = {}
    let description = "";

    if (this.state.charData && this.state.charData.select_race) {
      selectedRace = this.state.charData.select_race;
      thisRaceData = utilities.getObjectByName(raceData, selectedRace);

      if (thisRaceData[prop]) {
        description = thisRaceData[prop];
      } else {
        description = "no "+prop+" data for this race"
      }
    }

    return description;
  }

	render() {
    return <div className="container">

            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                <h1>Character Creation Form</h1>
                <TextInput type="text" label="Your Name (Not your Character's Name)" name="player_name" onChange={this.update}/>
                <TextInput type="text" label="Your Character's Name" name="character_name" onChange={this.update}/>
                <RaceForm onUpdate={this.update} charData={this.state.charData}/>
                <ClassForm onUpdate={this.update} charData={this.state.charData}/>
                <BackgroundForm onUpdate={this.update} charData={this.state.charData}/>
                <CharacterDetailsForm onUpdate={this.update} charData={this.state.charData} formDescription={this.getRaceDescription}/>
                <AbilityScoresForm onUpdate={this.update} charData={this.state.charData}/>
                <SkillsForm charData={this.state.charData} onUpdate={this.update} />
                </div>

              </div>
              <div className="col-sm-6 output-column">
                <CharacterSheet charData={this.state.charData}/>
              </div>
            </div>
      		</div>;
	}
}

ReactDOM.render(<DndForm />, document.querySelector('main'));
