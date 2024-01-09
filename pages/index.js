import { useState, useEffect } from 'react';
import getJoke from '../api/jokeData';

function Home() {
  const [jokeState, setJokeState] = useState('setup');
  const [line, setLine] = useState('Want to hear a Joke?');
  const [joke, setJoke] = useState();
  const [reaction, setReaction] = useState('YEP, I sure do');
  const [jokeCompleted, setJokeCompleted] = useState(1);

  useEffect(() => {
    getJoke().then((data) => {
      setJoke(data);
    });
  }, [jokeCompleted]);

  const handleClick = () => {
    if (jokeState === 'setup') {
      setLine(joke.setup);
      setJokeState('delivery');
      setReaction('Gimme Dat Punchline');
    }
    if (jokeState === 'delivery') {
      setLine(joke.delivery);
      setJokeCompleted((prevState) => prevState + 1);
      setReaction('lols, tell me another one');
      setJokeState('setup');
    }
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>{line}</h1>
      <button type="button" onClick={handleClick}>
        {reaction}
      </button>
    </div>
  );
}

export default Home;
