import { Modal } from "@/components/ui/Modal";
import { NoteForm } from "./NoteForm";
import { z } from "zod";
import { Topic } from "@/types/topic"; // Import Topic type

/**
 * Props for the CreateNoteModal component.
 * @typedef {object} CreateNoteModalProps
 * @property {boolean} isOpen - Controls the visibility of the modal.
 * @property {() => void} onClose - Callback function to close the modal.
 * @property {(data: { title: string; content: string; topic_id?: string | null }) => void} onNoteCreated - Callback function when a note is successfully created.
 * @property {boolean} loading - Indicates if the note creation process is in progress.
 * @property {Topic[]} topics - An array of available topics to associate with the note.
 */
interface CreateNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNoteCreated: (data: { title: string; content: string; topic_id?: string | null }) => void; // Updated data type to include topic_id
    loading: boolean;
    topics: Topic[]; // Add topics prop
}

/**
 * Renders a modal for creating a new note.
 * This component provides a form for users to input a note title, content,
 * and optionally associate it with a topic.
 *
 * @param {CreateNoteModalProps} props - The properties for the component.
 * @returns {JSX.Element} The Create Note Modal component.
 */
export default function CreateNoteModal({
    isOpen,
    onClose,
    onNoteCreated,
    loading,
    topics,
}: CreateNoteModalProps) {
    const handleSubmit = (data: z.infer<any>) => {
        onNoteCreated(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Note">
            <NoteForm onSubmit={handleSubmit} isLoading={loading} topics={topics} />
        </Modal>
    );
}