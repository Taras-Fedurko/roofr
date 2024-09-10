import './App.css';

import { useFetchPokemons } from './hooks/useFetchPokemons';

import Battle from './components/Battle'

function App() {
  const { loading, error, pokemons } = useFetchPokemons();

  if (loading) {
    return (<>Loading...</>);
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <div className="App">
      <Battle pokemons={pokemons} />
    </div>
  );
}

export default App;
