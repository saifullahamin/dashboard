import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function widgetBar(props) {
  const chartConfigs = {
    type: "bar2d",
    width: "100%",
    height: "150",
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
export default widgetBar;
