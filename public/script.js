const URL = 'http://localhost:5000/notes'


async function fetchNotes(){

    const response = await fetch(URL)
    const notes = await response.json()
    console.log(notes)
    notesContainer = document.getElementById("notes-container")

    notesContainer.innerHTML=' ';

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button class="delete-btn" onclick="deleteNote('${note.title}')">X</button>
        `;
        notesContainer.appendChild(noteElement);
    });

    
}

async function addNote(){
    let title = document.getElementById("title").value
    let content = document.getElementById("content").value
    await fetch(URL , {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({title,content})
    })
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    fetchNotes();
}


async function deleteNote (title) {
    await fetch (`${URL}/${title}`,{method:"DELETE"});
    fetchNotes();
}