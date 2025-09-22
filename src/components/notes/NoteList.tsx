import { NoteCard } from "./NoteCard";
import { NoteListProps } from "@/types/note";


export default function NoteList({
    notes,
    onEditNote,
    onDeleteNote,
    deletingNoteId,
}: NoteListProps) {
    if (notes.length === 0) {
        return (
            <p className="text-center text-gray-500">No notes found. Create one to get started!</p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={onEditNote}
                    onDelete={onDeleteNote}
                    isDeleting={deletingNoteId === note.id}
                />
            ))}
        </div>
    );
}