import { useState } from 'react';
import style from './App.module.css';
import type { DataResponse } from './types';

const BASE_PATH = 'http://localhost:3000';

function App() {
  const [id, setId] = useState<number>();
  const [data, setData] = useState<DataResponse>();

  const getUserData = async() => {
    try {
      const userPromise = await fetch(`${BASE_PATH}/user/${id}`);
      const userData = await userPromise.json();

      setData(userData);
    } catch (error) {
      console.error(error);
    }
  }

  return <main className={style.container}>
    <label htmlFor="userId">Id do usuário</label>
    <input type="number" name='userId'  id='userId' className={style.input} onChange={e => setId(+e.target.value)} />
    <button className={style.btn} onClick={getUserData}>Buscar</button>


    <h1>Response:</h1>
    {data && <pre> {JSON.stringify(data, undefined, 4)}</pre>}
  </main>;
  
}

export default App
