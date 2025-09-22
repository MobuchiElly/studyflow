import { Modal } from "@/components/ui/Modal";
import { NoteForm } from "./NoteForm";
import { z } from "zod";
import { Topic } from "@/types/topic"; // Import Topic type

interface CreateNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNoteCreated: (data: { title: string; content: string; topic_id?: string | null }) => void; // Updated data type to include topic_id
    loading: boolean;
    topics: Topic[]; // Add topics prop
}

export default function CreateNoteModal({
    isOpen,
    onClose,
    onNoteCreated,
    loading,
    topics, // Destructure topics prop
}: CreateNoteModalProps) {
    const handleSubmit = (data: z.infer<any>) => {
        onNoteCreated(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Note">
            <NoteForm onSubmit={handleSubmit} isLoading={loading} topics={topics} /> {/* Pass topics to NoteForm */}
        </Modal>
    );
}