import React from "react";
import { converter } from "../../csvConverter";
import { dThreeFunction } from "./dThree";
import { dThreeFunction2 } from "./dThree";
import { test } from "./byCountryD3";
import { useRef, useEffect } from "react";
import { ContactSupportOutlined } from "@material-ui/icons";
/**
 * COMPONENT
 */

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      countries: [],
    };
    this.test = this.test.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }
  componentDidMount() {
    const urlC02Emissions =
      "https://raw.githubusercontent.com/2206-capstone-npm-CEED/Dashboard_All_Datas/main/CO2_emissions_per_ton";
    const urlPopulation =
      "https://raw.githubusercontent.com/open-numbers/ddf--gapminder--population/master/ddf--datapoints--population--by--country--year.csv";
    const testurl =
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv";

    const fileStr2 = converter(urlPopulation, (results) => {
      this.setState({ data: results.data });

      // let d3data = this.state.data
      //   // .filter((obj, index) => obj.country !== "ind")
      //   // .filter((obj, index) => obj.country !== "chn")
      //   // .filter((obj, index) => obj.country === "civ")
      //   .filter((obj, index) => obj.year < 2023)
      //   .filter((obj, index) => index < 17300);
      // // console.log(d3data);
      // console.log(this.state);
      // dThreeFunction2(d3data, this.state.countries);
    });
    // const fileStr3 = converter(testurl, (results) => {
    //   this.setState({ data: results.data });

    //   let d3data = this.state.data;
    //   test(d3data);
    // });
    // function eachCountry(x) {
    //   console.log(this.state.data);
    // }
  }
  componentDidUpdate() {
    let d3data = this.state.data
      // .filter((obj, index) => obj.country !== "ind")
      // .filter((obj, index) => obj.country !== "chn")
      // .filter((obj, index) => obj.country === "civ")
      .filter((obj, index) => obj.year < 2023);
    // .filter((obj, index) => index < 17300);
    dThreeFunction2(d3data, this.state.countries);
  }
  test(country) {
    this.setState({
      ...this.state,
      countries: [...this.state.countries, country],
    });
    console.log(this.state);
  }
  selectCountry(evt) {
    // let country = this.target.event;
    console.log("evt target name", evt.target.name);
    console.log("evt target value", evt.target.checked);
    console.log("this state1", this.state);
    if (evt.target.checked === true) {
      const newState = {
        ...this.state,
        countries: [...this.state.countries, evt.target.name],
      };
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
    // console.log("ASDFASFDSAFASDFASD", event);
    // console.log("event target", event.target);
    // console.log("this state2", newState);
  }
  render() {
    // console.log(this.state.data);
    const allcountry = this.state.data;
    const byCountry = d3.groups(allcountry, (d) => d.country);
    // console.log(byCountry.map((country) => country[0]));
    const showData = this.state.data.filter(
      (obj, index) => obj.country !== byCountry[0]
    );
    // const ref = useRef(null);

    // useEffect(() => {
    //   const handleClick = (event) => {
    //     console.log("Button clicked");
    //   };

    //   const element = ref.current;

    //   element.addEventListener("click", handleClick);

    //   return () => {
    //     element.removeEventListener("click", handleClick);
    //   };
    // }, []);
    return (
      <div>
        <svg className="svg1" fill="black" width="500px" height="500px"></svg>
        <div>
          {/* <input type="checkbox" name="myCheckBox" /> */}
          <fieldset>
            <label for="myCheckBox">
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
          <svg className="svg2" width="2200" height="1500"></svg>
        </div>
        {/* <svg className="my_dataviz" width="2200" height="1500"></svg> */}
        <div>_________________________________</div>
        {/* <table>
          <thead>
            <tr>
              <th>country</th>
              <th>year</th>
              <th>population</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data
              .filter((obj, index) => index < 20)
              .map((obj, index) => (
                <tr key={index}>
                  <td>{obj.country}</td>
                  <td>{obj.year}</td>
                  <td>{obj.population}</td>
                </tr>
              ))}
          </tbody>
        </table> */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
