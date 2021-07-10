import React from "react";
import { FixedSizeList as List } from "react-window";
//import Rule from "./Rule";
//import rules from "../data/rule.json";
class Rules extends React.Component {
  constructor(props) {
    super(props);
    this.onMoveUp = this.onMoveUp.bind(this);
    this.onMoveDown = this.onMoveDown.bind(this);
    this.onClone = this.onClone.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      rules: [],
      error: null,
      isLoaded: true,
    };
  }

  componentDidMount() {
    fetch(
      "http://jivoxdevuploads.s3.amazonaws.com/eam-dev/files/44939/Rule%20JSON.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            //rules: result.data,
            rules: [...result.data], //use spread operator to make rules data immutable
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  //Moveup handler to move the item to top
  onMoveUp(key) {
    if (key === 0) return;
    const { rules } = this.state;
    const index = key - 1;
    const itemAbove = rules[index];
    rules[key - 1] = rules[key];
    rules[key] = itemAbove;
    this.setState({ rules: [...rules] });
  }
  //Movedown handler to move the item to down
  onMoveDown(key) {
    const { rules } = this.state;
    if (key === rules.length - 1) return;
    const index = key + 1;
    const itemBelow = rules[index];
    rules[key + 1] = rules[key];
    rules[key] = itemBelow;
    this.setState({ rules: [...rules] });
  }

  //Clone handler to copy the rule
  onClone(id, key) {
    const { rules } = this.state;

    //find the id
    const selectedRule = rules.find((rule) => rule.id === id);

    //for clone use JSON for deep copy
    const clonedRule = JSON.parse(JSON.stringify(selectedRule));
    rules[++key] = clonedRule;
    this.setState({ rules: [...rules] });
  }

  //Delete handler to delete rule
  onDelete(id, key) {
    const { rules } = this.state;
    this.setState({ rules: [...rules.filter((rule) => rule.id !== id)] });
  }

  Row = ({ index, style }) => {
    const rule = this.state.rules[index];
    return (
      <div className="Row" style={style}>
        <li key={index}>
          <div className="ruleNo">{index + 1} </div>
          <div className="ruleId">{rule.id} </div>
          <div className="ruleName">{rule.ruleName}</div>
          <div className="ruleArrows">
            <button className="btn btnUp" onClick={() => this.onMoveUp(index)}>
              Up
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btnDown"
              onClick={() => this.onMoveDown(index)}
            >
              Down
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btnClone"
              onClick={() => this.onClone(rule.id, index)}
            >
              Clone
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btnDelete"
              onClick={() => this.onDelete(rule.id, index)}
            >
              Delete
            </button>
          </div>
        </li>
      </div>
    );
  };

  render() {
    console.log("rules comp rendered");
    const { error, isLoaded, rules } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          <li key={Math.random()}>
            <div className="ruleNo">
              <strong>
                <i>Serial No.</i>
              </strong>
            </div>
            <div className="ruleId">
              <strong>
                <i>Rule Id</i>
              </strong>
            </div>
            <div className="ruleName">
              <strong>
                <i>Rule Name</i>
              </strong>
            </div>
            <div></div>
          </li>
          <List
            height={window.innerHeight}
            itemCount={rules.length}
            itemSize={45}
            width={window.innerWidth}
            itemData={rules}
          >
            {this.Row}
          </List>
          {/* {rules.map((rule, key) => (
            <Rule
              rule={rule}
              keyValue={key}
              onMoveUp={this.onMoveUp}
              onMoveDown={this.onMoveDown}
              onClone={this.onClone}
              onDelete={this.onDelete}
            />
          ))} */}
        </ul>
      );
    }
  }
}

export default Rules;
