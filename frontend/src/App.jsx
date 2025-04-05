// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
// import Home from './pages/Home'
import Footer from './components/Footer'
import Home from './pages/Home'
import { useState } from 'react';
import NoteForm from './components/NoteForm';
import useNoteStore from './store/noteStore';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addNote = useNoteStore((state) => state.addNote);
  const [editingNote, setEditingNote] = useState(null); // Estado para la nota en edición
  const editNote = useNoteStore((state) => state.editNote);
  return (
    <>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <div className='bg-white  border-b-2 border-[#E5E7EB]'>
          <Header onCreate={() => { setIsModalOpen(true); setEditingNote(null); }} />

        </div>

        <main className="overflow-y-auto">
          <div className="max-w-[1200px] w-full mx-auto">
            <Home onEdit={(note) => { setEditingNote(note); setIsModalOpen(true); }} />
          </div>
        </main>
        <div className='bg-white  border-t-2 border-[#E5E7EB]'>
          <Footer />
        </div>
        {isModalOpen && (
          <NoteForm
            initialNote={editingNote}
            onSave={(note) => {
              if (editingNote) {
                editNote(note);
              } else {
                addNote(note);
              }
              setIsModalOpen(false);
            }}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>

    </>
  )
}

export default App
