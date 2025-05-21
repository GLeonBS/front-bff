import { useState } from 'react';
import style from './App.module.css';
import type { Album, DataResponse, Post, Todo, User } from './types';

const BASE_PATH = 'https://jsonplaceholder.typicode.com';

function App() {
  const [id, setId] = useState<number>();
  const [data, setData] = useState<DataResponse>();

  const getUserData = async() => {
    try {
      const userData = await Promise.all([
        fetch(`${BASE_PATH}/users/${id}`).then(res => res.json()),
        fetch(`${BASE_PATH}/posts/?userId=${id}`).then(res => res.json()),
        fetch(`${BASE_PATH}/albums/?userId=${id}`).then(res => res.json()),
        fetch(`${BASE_PATH}/todos/?userId=${id}`).then(res => res.json()),
      ])

      const [userPromise, postPromise, albumsPromise, todosPromise] = userData;
      const user: User = await userPromise;
      const posts: Post[] = await postPromise;
      const albums: Album[] = await albumsPromise;
      const todos: Todo[] = await todosPromise;

      setData({ user, posts, albums, todos });
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
