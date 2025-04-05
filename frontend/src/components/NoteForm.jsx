import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, updateNote } from "../services/noteService";
import { motion, AnimatePresence } from "framer-motion";

export default function NoteForm({ initialNote = null, onClose }) {
  const [title, setTitle] = useState(initialNote ? initialNote.title : "");
  const [content, setContent] = useState(initialNote ? initialNote.content : "");
  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState(true);

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const updateMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialNote) {
      updateMutation.mutate({ id: initialNote.id, title, content });
    } else {
      createMutation.mutate({ title, content });
    }
    setIsVisible(false); // Cierra el formulario al guardar
    setTimeout(onClose, 500); // Cierra el modal después de la animación
  };

  const isFormValid = title.trim() && content.trim();
  const hasChanges =
    initialNote &&
    (title.trim() !== initialNote.title || content.trim() !== initialNote.content);

  const isDisabled = initialNote ? !hasChanges : !isFormValid;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-90 flex justify-center items-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 border border-[#E5E7EB] rounded-lg w-96"
          >
            <h2 className="text-xl font-bold mb-4">{initialNote ? "Edit Note" : "New Note"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-[#E5E7EB] p-2 rounded-lg w-full text-[#4B5563]"
                />
              </div>
              <div>
                <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="border border-[#E5E7EB] p-2 rounded-lg w-full text-[#4B5563] h-24"
                />
              </div>
              <div className="flex justify-end gap-2">
                <motion.button
                  aria-label="cancel button"
                  type="button"
                  onClick={() => { setIsVisible(false); setTimeout(onClose, 500); }}
                  className="border border-[#E5E7EB] bg-[#F9FAFB] text-gray-500 px-4 py-2 rounded-lg"
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  aria-label="save button"
                  type="submit"
                  disabled={isDisabled}
                  className={`px-4 py-2 rounded-lg ${isDisabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white"}`}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {initialNote ? "Update" : "Save"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
