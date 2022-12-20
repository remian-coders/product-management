import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function ToggleButtonGroupControlled({
  scheduler,
  updateScheduler,
}) {
  const radios = [
    { name: "Off", value: "off" },
    { name: "On", value: "on" },
  ];

  return (
    <ButtonGroup className="mx-3">
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          type="radio"
          variant={idx % 2 ? "outline-success" : "outline-danger"}
          name="radio"
          value={radio.value}
          checked={scheduler === radio.value}
          onChange={(e) => updateScheduler(e.currentTarget.value)}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}
