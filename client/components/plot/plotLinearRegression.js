import * as Plot from "@observablehq/plot";

export const plotFuncLinearRegression = (state) => {
  let minYear = state.years[0];
  let maxYear = state.years[1];
  let splitYear = state.half;
  let yVar = state.display;

  //
  let filteredName = state.data.filter((obj, index) => {
    return state.countries.includes(obj.name);
  });

  //
  let filteredYearsBelow = filteredName.filter(
    (obj, index) => +obj.time >= +minYear && +obj.time <= +splitYear
  );

  let filteredDataBelow = filteredYearsBelow.map((obj) => {
    obj.time = +obj.time;

    // obj.lifeExpectancy = +obj.lifeExpectancy;
    obj[`${yVar}`] = +obj[`${yVar}`];
    return obj;
  });
  //

  let filteredYearsAbove = filteredName.filter(
    (obj, index) => +obj.time >= +splitYear && +obj.time <= +maxYear
  );

  let filteredDataAbove = filteredYearsAbove.map((obj) => {
    obj.time = +obj.time;

    // obj.lifeExpectancy = +obj.lifeExpectancy;
    obj[`${yVar}`] = +obj[`${yVar}`];
    return obj;
  });
  //

  return {
    height: 900,
    width: 1500,
    y: {
      grid: true,
      type: "log",
    },
    x: {
      type: "log",
      tickFormat: (d) => d,
    },
    grid: true,
    color: { legend: true },
    marks: [
      // Plot.dot(filteredData, {
      //   x: "time",
      //   y: "lifeExpectancy",
      //   fill: "name",
      // }),
      Plot.dot(filteredDataBelow, {
        x: "time",
        y: `${yVar}`,
        fill: "name",
      }),
      Plot.dot(filteredDataAbove, {
        x: "time",
        y: `${yVar}`,
        fill: "name",
      }),
      // Plot.linearRegressionY(filteredData, {
      //   x: "year",
      //   y: "lifeExpectancy",
      //   stroke: "name",
      // }),
      // Plot.linearRegressionY(filteredData, {
      //   x: "year",
      //   y: "lifeExpectancy",
      // }),
      Plot.linearRegressionY(filteredDataBelow, {
        x: "time",
        y: `${yVar}`,
        stroke: "name",
      }),
      Plot.linearRegressionY(filteredDataBelow, {
        x: "time",
        y: `${yVar}`,
      }),
      Plot.linearRegressionY(filteredDataAbove, {
        x: "time",
        y: `${yVar}`,
        stroke: "name",
      }),
      Plot.linearRegressionY(filteredDataAbove, {
        x: "time",
        y: `${yVar}`,
      }),
    ],
  };
};
