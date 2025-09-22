import { NoteCard } from "./NoteCard";
import { NoteListProps } from "@/types/note";


/**
 * Renders a list of note cards.
 * Displays a message if no notes are available.
 *
 * @param {NoteListProps} props - The properties for the component.
 * @param {Note[]} props.notes - An array of note objects to display.
 * @param {(note: Note) => void} props.onEditNote - Callback function to handle editing a note.
 * @param {(id: string) => void} props.onDeleteNote - Callback function to handle deleting a note.
 * @param {string | null} props.deletingNoteId - The ID of the note currently being deleted, if any.
 * @returns {JSX.Element} A grid of NoteCard components or a message if no notes are present.
 */
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