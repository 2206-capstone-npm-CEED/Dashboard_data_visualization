import React from "react";
import { converter } from "../../csvConverter";
import { plotFunc } from "./plot/plotLineChart";
import { PlotFigure } from "plot-react";

export default class Plot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], countries: ["chn", "usa"] };
    this.myRef = React.createRef();
    this.selectCountry = this.selectCountry.bind(this);
  }

  componentDidMount() {
    const urlPopulation =
      "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--population/master/ddf--datapoints--population--by--country--year.csv";

    const fileStr2 = converter(urlPopulation, (results) => {
      this.setState({ ...this.state, data: results.data });
    });
  }

  selectCountry(evt) {
    if (evt.target.checked === true) {
      this.setState({
        ...this.state,
        countries: [...this.state.countries, evt.target.name],
      });
    } else {
      const newState = {
        ...this.state,
        countries: this.state.countries.filter(
          (country) => country !== evt.target.name
        ),
      };

      this.setState(newState);
    }
  }
  render() {
    const allcountry = this.state.data;
    const byCountry = d3.groups(allcountry, (d) => d.country);

    const showData = this.state.data.filter(
      (obj, index) => obj.country !== byCountry[0]
    );
    if (!this.state.data.length) {
      return "hi";
    }
    console.log("hello", this.state);
    return (
      <div>
        <div className="plot" ref={this.myRef}>
          <PlotFigure options={plotFunc(this.state)} />
        </div>
        <div>
          <fieldset>
            <label htmlFor="myCheckBox">
              {byCountry.map((country, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name={country[0]}
                    onClick={this.selectCountry}
                  />
                  {country[0]}
                </div>
              ))}
            </label>
          </fieldset>
        </div>
      </div>
    );
  }
}
