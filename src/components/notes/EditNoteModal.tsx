import { Modal } from "@/components/ui/Modal";
import { NoteForm } from "./NoteForm";
import { Note } from "@/types/note";
import { Topic } from "@/types/topic"; // impot {NoteCra}

interface EditNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    note: Note;
    onNoteEdited: (data: { title: string; content: string; topic_id?: string | null }) => void; // Updated data type to include topic_id
    loading: boolean;
    topics: Topic[]; // Add topics prop
}

export default function EditNoteModal({
    isOpen,
    onClose,
    note,
    onNoteEdited,
    loading,
    topics, // Destructure topics prop
}: EditNoteModalProps) {
    const handleSubmit = (data: { title: string; content: string; topic_id?: string | null }) => {
        onNoteEdited(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Edit Note: ${note.title}`}>
            <NoteForm initialData={note} onSubmit={handleSubmit} isLoading={loading} topics={topics} />
        </Modal>
    );
}