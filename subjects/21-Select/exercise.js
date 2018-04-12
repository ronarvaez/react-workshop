////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make this work like a normal <select> box!
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };

  constructor(props) {
    super();
    this.state = {
      showOptions: false,
      selectedValue: {
        value: props.value,
        description: props.defaultValue || "Select One"
      }
    };
  }

  handleClick = () => {
    this.setState(prev => ({ showOptions: !prev.showOptions }));
  };

  optionSelected = (value, textLabel) => {
    this.setState(() => ({
      showOptions: false,
      selectedValue: { description: textLabel }
    }));
  };

  render() {
    const { showOptions, selectedValue } = this.state;
    return (
      <div className="select">
        <div className="label" onClick={this.handleClick}>
          {selectedValue.description} <span className="arrow">▾</span>
        </div>
        <div
          className="options"
          style={{
            display: showOptions ? "inline-block" : "none"
          }}
        >
          {React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              selected: selectedValue === child.props.value,
              optionSelected: this.optionSelected
            });
          })}
        </div>
      </div>
    );
  }
}

class Option extends React.Component {
  handleClick = () => {
    const { optionSelected, value, children } = this.props;
    optionSelected(value, children);
  };

  render() {
    return (
      <div onClick={this.handleClick} className="option">
        {this.props.children}
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    selectValue: "dosa"
  };

  setToMintChutney = () => {
    this.setState({ selectValue: "mint-chutney" });
  };

  render() {
    return (
      <div>
        <h1>Select + Option</h1>

        <h2>Controlled</h2>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <p>
          <button onClick={this.setToMintChutney}>
            Set to Mint Chutney
          </button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={value => this.setState({ selectValue: value })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
