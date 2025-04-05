import { Edit, Trash2, ArchiveRestore } from 'lucide-react';
import React from 'react';
import Swal from 'sweetalert2';

export default function NoteCard({
  title, description, date, onEdit, onDelete, onArchive, isArchived
}) {


  const handleDelete = () => {
    // Usar SweetAlert2 para pedir confirmación
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#e7000b',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire(
          'Deleted!',
          'Your note has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 w-full max-w-[370px] h-[242px] grid grid-rows-[auto_1fr_auto]">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-lg">{title}</h2>
        <div className="flex gap-2">
          {!isArchived && (
            <button aria-label='edit button' onClick={onEdit} className="text-[#9CA3AF] hover:text-gray-700 cursor-pointer">
              <Edit size={16} />
            </button>
          )}
          <button aria-label='delete button' onClick={handleDelete} className="text-[#9CA3AF] hover:text-red-600 cursor-pointer">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-[#4B5563] mt-2">{description}</p>

      <div className="mt-3 text-sm text-[#6B7280] flex justify-between items-center">
        <span>Created: {date}</span>
        <button aria-label='Archivated' onClick={onArchive} className="text-[#2563EB]  cursor-pointer">
          {isArchived ? "Unarchive" : "Archive"}
        </button>
      </div>
    </div>
  );
}
