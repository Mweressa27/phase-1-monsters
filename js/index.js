const monsterContainer = document.getElementById('monster-container');
const backButton = document.getElementById('back');
const forwardButton = document.getElementById('forward');
const monsterForm = document.getElementById('monster-form');


let currentPage = 1;
const limit = 50;


document.addEventListener('DOMContentLoaded', () => {
  fetchMonsters(currentPage);

  
  backButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchMonsters(currentPage);
    }
  });

  
  forwardButton.addEventListener('click', () => {
    currentPage++;
    fetchMonsters(currentPage);
  });

  
  monsterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const description = document.getElementById('description').value;

    const newMonster = {
      name: name,
      age: parseFloat(age),
      description: description
    };

    createMonster(newMonster);
  });
});


function fetchMonsters(page) {
  fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`)
    .then(response => response.json())
    .then(data => {
      monsterContainer.innerHTML = ''; 
      
      data.forEach(monster => {
        const monsterDiv = document.createElement('div');
        monsterDiv.innerHTML = `
          <h3>${monster.name}</h3>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterDiv);
      });
    })
    .catch(error => console.error('Error fetching monsters:', error));
}


function createMonster(monster) {
  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(monster)
  })
    .then(response => response.json())
    .then(newMonster => {
      
      fetchMonsters(currentPage);
      
      
      monsterForm.reset();
    })
    .catch(error => console.error('Error creating monster:', error));
}
