import React from "react";
import CircularSlider from "react-circular-slider-svg";

const CircleSlider = ({ onChange }) => {
  const [value1, setValue1] = React.useState(0);

  const sliderStyles = {
    fill: "none",
    stroke: "#cecece",
    strokeWidth: "20px",
  };

  const activeSliderStyles = {
    fill: "none",
    stroke: "#16a34a",
    strokeWidth: "20px",
  };

  const circleStyles = {
    fill: "#16a34a",
    stroke: "#fff",
    strokeWidth: "8px",
    r: "16px",
  };

  const handleChange = (newValue) => {
    setValue1(Math.round(newValue));
    onChange(newValue);
  };

  return (
    <div className="relative">
      <CircularSlider
        size={175}
        trackWidth={8}
        minValue={0}
        maxValue={100}
        startAngle={60}
        endAngle={300}
        angleType={{
          direction: "cw",
          axis: "-y",
        }}
        handle1={{
          value: value1,
          onChange: handleChange,
        }}
        arcColor={activeSliderStyles.stroke}
        arcBackgroundColor={sliderStyles.stroke}
      >
        <path style={sliderStyles} />
        <path style={activeSliderStyles} />
        <circle style={circleStyles} />
      </CircularSlider>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3">
        <div className="text-center mt-2 text-4xl font-bold">{value1}</div>
      </div>
    </div>
  );
};

export default CircleSlider;
