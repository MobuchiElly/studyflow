import { Modal } from "@/components/ui/Modal";
import { NoteForm } from "./NoteForm";
import { Note } from "@/types/note";
import { Topic } from "@/types/topic"; // impot {NoteCra}

/**
 * Props for the EditNoteModal component.
 * @typedef {object} EditNoteModalProps
 * @property {boolean} isOpen - Controls the visibility of the modal.
 * @property {() => void} onClose - Callback function to close the modal.
 * @property {Note} note - The note object to be edited.
 * @property {(data: { title: string; content: string; topic_id?: string | null }) => void} onNoteEdited - Callback function when a note is successfully edited.
 * @property {boolean} loading - Indicates if the note editing process is in progress.
 * @property {Topic[]} topics - An array of available topics to associate with the note.
 */
interface EditNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    note: Note;
    onNoteEdited: (data: { title: string; content?: string; topic_id?: string | null }) => void; // Updated data type to include topic_id
    loading: boolean;
    topics: Topic[]; // Add topics prop
}

/**
 * Renders a modal for editing an existing note.
 * This component pre-fills a form with the existing note's data, allowing users to
 * modify the title, content, and optionally change its associated topic.
 *
 * @param {EditNoteModalProps} props - The properties for the component.
 * @returns {JSX.Element} The Edit Note Modal component.
 */
export default function EditNoteModal({
    isOpen,
    onClose,
    note,
    onNoteEdited,
    loading,
    topics, // Destructure topics prop
}: EditNoteModalProps) {
    const handleSubmit = (data: { title: string; content?: string; topic_id?: string | null }) => {
        onNoteEdited(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Edit Note: ${note.title}`}>
            <NoteForm initialData={note} onSubmit={handleSubmit} isLoading={loading} topics={topics} />
        </Modal>
    );
}