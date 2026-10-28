import { useFeedback } from '../store';

const Buttons = () => {
  const { incrementGood, incrementNeutral, incrementBad } = useFeedback();

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incrementGood}>good</button>
      <button onClick={incrementNeutral}>neutral</button>
      <button onClick={incrementBad}>bad</button>
    </div>
  );
};

export default Buttons;
