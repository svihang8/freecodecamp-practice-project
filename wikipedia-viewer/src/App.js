import './App.css';
import { useState, useEffect } from 'react';
import Search from './Search';

function App() {
  const [search, setSearch] = useState(false);

  const openSearch = () => {
    try {
      setSearch(!search);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      {
        (search && <Search openSearch={openSearch} />)
        ||
        <>
          <p>Click here for random article</p>
          <p onClick={() => { openSearch(); }}>Search</p>
          <p>Click icon to Search</p>
        </>
      }
    </div>
  );
}

export default App;
