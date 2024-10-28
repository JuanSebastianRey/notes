import { useState } from 'react';
import './notes.css'
import arrow from '../../assets/img/chevron_left.png';
import save from '../../assets/img/save.png';
import vision from '../../assets/img/visibility.png';
import edit from '../../assets/img/mode.png';
import { Link } from 'react-router-dom';

export default function Notes() {
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [noteContent, setNoteContent] = useState('');

    const handleTextChange = (e) => {
        setNoteContent(e.target.value);
        setHasChanges(true);
    };

    const handleSaveClick = () => {
        setShowSaveModal(true);
    };

    const handleBackClick = () => {
        if (hasChanges) {
            setShowDiscardModal(true);
        }
        // Si no hay cambios, navegar directamente
    };

    const handleSave = () => {
        // Aquí iría la lógica para guardar
        setShowSaveModal(false);
        setHasChanges(false);
    };

    const handleDiscard = () => {
        setShowDiscardModal(false);
        // Aquí iría la lógica para navegar hacia atrás
    };

    return (
        <main className="notes">
            <header className='note-container'>
                <div className='back-container'>
                    <Link>
                        <img src={arrow} alt='Back' onClick={handleBackClick} />
                    </Link>
                </div>
                <div className='actions-container'>
                    <img src={save} alt='Save' onClick={handleSaveClick} />
                    <img src={vision} alt='Visibility' />
                    <img src={edit} alt='Edit' />
                </div>
            </header>
            <section>
                <textarea
                    placeholder='Type something...'
                    value={noteContent}
                    onChange={handleTextChange}
                />
            </section>

            {/* Modal de Guardar */}
            {showSaveModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Save changes ?</h2>
                        <div className="modal-buttons">
                            <button
                                className="modal-button discard-button"
                                onClick={() => setShowSaveModal(false)}
                            >
                                Discard
                            </button>
                            <Link to='/'>
                                <button
                                    className="modal-button save-button"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Descartar */}
            {showDiscardModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Are you sure you want discard your changes?</h2>
                        <div className="modal-buttons">
                            <Link to='/'>
                                <button
                                    className="modal-button discard-button"
                                    onClick={handleDiscard}
                                >
                                    Discard
                                </button>
                                <button
                                    className="modal-button keep-button"
                                    onClick={() => setShowDiscardModal(false)}
                                >
                                    Keep
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}