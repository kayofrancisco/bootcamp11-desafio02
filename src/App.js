import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    async function loadRepositories() {
      await api.get('repositories').then(response => {
        setRepositories(response.data);
      });

    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    await api.post('/repositories', {
      title: `Repositorio para desafios do bootcamp ${Date.now()}`,
      techs: ['Nodejs', 'Reactjs'],
      url: 'github.com/kayofrancisco/bootcamp-11'
    })
      .then(response => {
        setRepositories([...repositories, response.data])
      }).catch();
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      repositories.splice(repositoryIndex, 1);
      setRepositories([...repositories]);
    }).catch(err => {
      alert('err');
    });;
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => { handleRemoveRepository(repository.id) }}>
              Remover
            </button>
            <br />
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;