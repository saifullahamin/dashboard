import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function widgetPareto(props) {
  const chartConfigs = {
    type: "pareto2d", 
    width: "100%",
    height: "300",
    dataFormat: "json", 
    dataSource: {
      chart: {
        bgColor: "#2a2a2a",
        theme: "fusion",
      },
      data: props.data,
    },
  };
  return (
    <div className="widgetWrap">
      <div className="widgetTitle">{props.title}</div>
      <div className="widgetValue">
        <ReactFC {...chartConfigs} />
      </div>
    </div>
  );
}
export default widgetPareto;
