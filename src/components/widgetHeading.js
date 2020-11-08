import React from "react";

function widgetHeading(props) {
  return (
    <div className="widgetWrap">
      <div className="widgetHeading">{props.heading}</div>
    </div>
  );
}
export default widgetHeading;