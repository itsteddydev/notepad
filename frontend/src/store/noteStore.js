import { create } from "zustand";

const useNoteStore = create((set) => ({
  notes: [],
  archivedNotes: [],

  addNote: (note) =>
    set((state) => ({
      notes: [note, ...state.notes], // Nuevas notas siempre al principio
    })),

  editNote: (updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      ),
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
      archivedNotes: state.archivedNotes.filter((note) => note.id !== id),
    })),

  archiveNote: (id) =>
    set((state) => {
      const index = state.notes.findIndex((n) => n.id === id);
      if (index === -1) return state; // Si no se encuentra, no hacer nada

      const note = { ...state.notes[index], originalIndex: index }; // Guardamos la posición original
      const newNotes = state.notes.filter((_, i) => i !== index);

      return {
        notes: newNotes,
        archivedNotes: [...state.archivedNotes, note],
      };
    }),

  unarchiveNote: (id) =>
    set((state) => {
      const noteIndex = state.archivedNotes.findIndex((n) => n.id === id);
      if (noteIndex === -1) return state;

      const note = state.archivedNotes[noteIndex];
      const newArchivedNotes = state.archivedNotes.filter((_, i) => i !== noteIndex);

      // Insertamos la nota en su posición original en las notas activas
      const newNotes = [...state.notes];
      newNotes.splice(note.originalIndex, 0, note); // Colocamos la nota en la posición original

      return {
        archivedNotes: newArchivedNotes,
        notes: newNotes,
      };
    }),
}));

export default useNoteStore;
