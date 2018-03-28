import * as React from "react";
import locate from "./locator";
import axios from "axios";

interface LocatorState
{
  user: [number, number];
  located: [number, number];
  data: [number, number][];
  spinner: boolean;
}

export default class Locator extends React.Component<{}, LocatorState>
{

  constructor()
  {
    super();

    this.state = {
      user: [0, 0],
      located: [0, -31],
      data: [],
      spinner: true
    };

  }

  componentDidMount()
  {
    axios("data.json")
      .then((data) =>
      {
        this.setState({
          ...this.state,
          data: data.data,
          spinner: false
        });
      });
  }

  handleChange(event: Event)
  {
    switch (event.target["name"])
    {
      case "x":
      this.setState({
        ...this.state,
        user: [ event.target["value"], this.state.user[1] ]
      });
      break;

      case "z":
      this.setState({
        ...this.state,
        user: [ this.state.user[0], event.target["value"] ]
      });
      break;

      default:
      break;
    }
  }

  handleSubmit(event: Event)
  {
    let coords: [number, number];
    event.preventDefault();
    this.setState({...this.state, spinner: true});

    coords = locate(this.state.data, this.state.user);

    this.setState({
      ...this.state,
      located: coords,
      spinner: false
    });

  }

  render()
  {
    return (
    <section className="locator">
      <p>Enter your current Nether coordinates...</p>
      <section className="input">
        <form className="inputForm" onSubmit={this.handleSubmit.bind(this)}>
          <input autoFocus type="number" className="inputX" name="x" value={this.state.user[0]} onChange={this.handleChange.bind(this)} />
          <input type="number" className="inputZ" name="z" value={this.state.user[1]} onChange={this.handleChange.bind(this)} />
          <input type="submit" value="&rarr;" />
        </form>
      </section>
      <p>...and kill your Wither here:</p>
      <section className="output">
        <div>{this.state.located[0]}, {this.state.located[1]}</div>
      </section>
    </section>
    );
  }
}
