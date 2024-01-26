import { Field } from "formik";
import { set } from "husky";
import { useEffect, useState } from "react";
import Draggable, {
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from "react-draggable";

interface SliderProps {
  range: number;
  name: string;
  label?: string;
  setFieldValue?: (field: string, value: number) => void;
  error: string | null;
}

export default function Slider({
  range,
  name,
  label,
  setFieldValue,
  error,
}: SliderProps) {
  const [value, setValue] = useState<number>(1);
  const [sliderPosition, setSliderPosition] = useState<number>(0);
  const [sliderWidth, setSliderWidth] = useState<number>(10);

  const handleDrag: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData,
  ) => {
    setSliderPosition(data.x);
  };

  const handleStop: DraggableEventHandler = (
    e: DraggableEvent,
    data: DraggableData,
  ) => {
    // set value based on position
    const newPosition = Math.round(data.x / sliderWidth);
    const newValue = newPosition + 1;
    setFieldValue && setFieldValue(name, newValue);
  };

  useEffect(() => {
    const slider = document.getElementById(`slider-${name}-0`);
    if (slider) {
      const width = slider.offsetWidth;
      setSliderWidth(width);
    }
  }, []);

  return (
    <>
      <label className="flex">
        <span className="text-3xl font-bold p-2">{label}</span>
      </label>
      <div className="w-full bg-zinc-700 bg-opacity-20 rounded-[20px]">
        <div
          className={`bg-gradient-to-b from-white to-primary rounded-[20px] border w-full`}
          style={
            range === value
              ? { width: "100%" }
              : { width: `${sliderPosition + 45}px` }
          }
        >
          <Draggable
            onDrag={handleDrag}
            onStop={handleStop}
            axis="x"
            grid={[sliderWidth, 10]}
            bounds={{
              left: 0,
              right: sliderWidth * (range - 1),
            }}
          >
            <div className={`bg-white rounded-[20px] w-10 h-10`}></div>
          </Draggable>
        </div>
      </div>

      <div className={"w-full flex p-4"}>
        {[...Array(range - 1)].map((_, i) => {
          const id = `slider-${name}-${i}`;

          return (
            <div key={i} id={id} className={`w-full`}>
              {i + 1}
            </div>
          );
        })}
        <div className={`w-fit`} id={`slider-${name}-${range - 1}`}>
          {range}
        </div>
      </div>
      {error && <span className="font-bold text-red-500">{error}</span>}
    </>
  );
}
