import "./Die.css";

function Die(props) {
  const style = props.isHeld ? "isHeld" : null;

  return (
    <button className={`die ${style}`} onClick={props.toggleHold}>
      {props.value}
    </button>
  );
}

export default Die;
