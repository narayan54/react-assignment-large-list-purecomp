import React from "react";

export default class Rule extends React.Component {
  onMoveUp(key) {
    this.props.onMoveUp(key);
  }
  onMoveDown(key) {
    this.props.onMoveDown(key);
  }
  onClone(id, key) {
    this.props.onClone(id, key);
  }
  onDelete(id, key) {
    this.props.onDelete(id, key);
  }
  render() {
    //console.log("rule comp rendered");
    return (
      <div>
        <li key={this.props.keyValue}>
          <div className="ruleNo">{this.props.keyValue + 1} </div>
          <div className="ruleId">{this.props.rule.id} </div>
          <div className="ruleName">{this.props.rule.ruleName}</div>
          <div className="ruleArrows">
            <button
              className="btn btnUp"
              onClick={() => this.onMoveUp(this.props.keyValue)}
            >
              Up
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btnDown"
              onClick={() => this.onMoveDown(this.props.keyValue)}
            >
              Down
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btnClone"
              onClick={() =>
                this.onClone(this.props.rule.id, this.props.keyValue)
              }
            >
              Clone
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
              className="btn btnDelete"
              onClick={() =>
                this.onDelete(this.props.rule.id, this.props.keyValue)
              }
            >
              Delete
            </button>
          </div>
        </li>
      </div>
    );
  }
}
