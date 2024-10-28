import React, { useState } from 'react';
import search from '../../assets/img/search.png';
import info from '../../assets/img/info_outline.png';
import center from '../../assets/img/rafiki.png';
import add from '../../assets/img/add.png';
import trash from '../../assets/img/delete.png'
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
    const [notes, setNotes] = useState([]);
    const [longPressedNote, setLongPressedNote] = useState(null);
    const [pressTimer, setPressTimer] = useState(null);

    const createNote = () => {
        const newNote = {
            id: Date.now(),
            title: `Note ${notes.length + 1}`,
        };
        setNotes([...notes, newNote]);
    };

    const startPress = (e, noteId) => {
        if (pressTimer) {
            clearTimeout(pressTimer);
        }

        const timer = setTimeout(() => {
            setLongPressedNote(noteId);
        }, 2000);

        setPressTimer(timer);
    };

    const endPress = () => {
        if (pressTimer) {
            clearTimeout(pressTimer);
            setPressTimer(null);
        }
    };

    const deleteNote = (e, noteId) => {
        e.preventDefault(); // Prevenir la navegación solo cuando estamos eliminando
        
        if (longPressedNote === noteId) {
            setNotes(notes.filter(note => note.id !== noteId));
            setLongPressedNote(null);
        }
    };

    return (
        <main className='home'>
            <header className='container-home'>
                <div className='card-home'>
                    <div className='text-card-home'>
                        <h1>Notes</h1>
                    </div>
                    <div className='img-card-home'>
                        <div>
                            <img src={search} alt="Search" />
                        </div>
                        <div>
                            <img src={info} alt="info" />
                        </div>
                    </div>
                </div>
            </header>

            <section className='container-note'>
                {notes.length === 0 ? (
                    <>
                        <img src={center} alt="" />
                        <h2>Create your first note!</h2>
                    </>
                ) : (
                    <div className='notes-container'>
                        {notes.map((note) => (
                            <div key={note.id}>
                                {longPressedNote === note.id ? (
                                    <div
                                        className="note delete-mode"
                                        onClick={(e) => deleteNote(e, note.id)}
                                    >
                                        <img src={trash} alt="delete" />
                                    </div>
                                ) : (
                                    <Link to='/notes'>
                                        <div
                                            className="note"
                                            onMouseDown={(e) => startPress(e, note.id)}
                                            onMouseUp={endPress}
                                            onMouseLeave={endPress}
                                            onTouchStart={(e) => startPress(e, note.id)}
                                            onTouchEnd={endPress}
                                            onTouchCancel={endPress}
                                        >
                                            <h3>{note.title}</h3>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <footer className='container-add'>
                <div onClick={createNote}>
                    <img src={add} alt="" />
                </div>
            </footer>
        </main>
    );
}