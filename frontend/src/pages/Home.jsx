import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NoteCard from "../components/NoteCard";
import ToggleNotesView from "../components/ToggleNotesView";
import { fetchNotes, deleteNote, archiveNote, unarchiveNote, getArchivedNotes } from "../services/noteService";
import { motion, AnimatePresence } from "framer-motion";


export default function Home({ onEdit }) {
  const [showArchived, setShowArchived] = useState(false);
  const queryClient = useQueryClient();

  // Obtener notas activas y archivadas con React Query
  const { data: notes = [], isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    enabled: !showArchived,  // Solo se obtiene notas activas si no estamos mostrando archivadas
  });

  const { data: archivedNotes = [] } = useQuery({
    queryKey: ["archivedNotes"],
    queryFn: getArchivedNotes,
    enabled: showArchived,  // Solo se obtiene notas archivadas si estamos mostrando archivadas
  });

  // Mutaciones
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
      queryClient.invalidateQueries(["archivedNotes"]);
    },
  });

  const archiveMutation = useMutation({
    mutationFn: archiveNote,
    onSuccess: () => {
      // Después de archivar, recargar las notas activas y archivadas
      queryClient.invalidateQueries(["notes"]);
      queryClient.invalidateQueries(["archivedNotes"]);
    },
  });

  const unarchiveMutation = useMutation({
    mutationFn: unarchiveNote,
    onSuccess: () => {
      // Después de desarchivar, recargar las notas activas y archivadas
      queryClient.invalidateQueries(["notes"]);
      queryClient.invalidateQueries(["archivedNotes"]);
    },
  });

  // Determinar las notas a mostrar según si estamos viendo archivadas o no
  const displayedNotes = showArchived ? archivedNotes : notes;

  return (
    <div className="my-8">
      <ToggleNotesView showArchived={showArchived} onToggle={setShowArchived} />
      <div className="p-6 flex justify-evenly items-center gap-4 flex-wrap">
        {isLoading ? (
          <p>Cargando notas...</p>
        ) : (
          <AnimatePresence mode="popLayout">
            {
              displayedNotes.length > 0 ? (
                displayedNotes.map((note) => (

                  <motion.div
                    key={note.id}
                    layout // Esto habilita la animación compartida de diseño
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-[370px]"
                  >
                    <NoteCard
                      key={note.id}
                      title={note.title}
                      description={note.content}
                      date={new Date(note.createdAt).toLocaleDateString()}
                      onEdit={() => onEdit(note)}
                      onDelete={() => deleteMutation.mutate(note.id)}
                      onArchive={() =>
                        showArchived ? unarchiveMutation.mutate(note.id) : archiveMutation.mutate(note.id)
                      }
                      isArchived={showArchived}
                    />
                  </motion.div>
                ))


              ) : (
                <motion.p
                  key="no-notes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-gray-500"
                >
                  No hay notas {showArchived ? "archivadas" : "activas"}.
                </motion.p>
              )}
          </AnimatePresence>
        )

        }
      </div>
    </div >
  );
}
