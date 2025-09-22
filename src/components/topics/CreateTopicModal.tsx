import { Modal } from "@/components/ui/Modal";
import { TopicForm } from "./TopicForm";
import { z } from "zod";

interface CreateTopicModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTopicCreated: (data: { title: string; description: string }) => void;
    loading: boolean;
}

export default function CreateTopicModal({
    isOpen,
    onClose,
    onTopicCreated,
    loading,
}: CreateTopicModalProps) {
    const handleSubmit = (data: z.infer<any>) => {
        onTopicCreated(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Topic">
            <TopicForm onSubmit={handleSubmit} isLoading={loading} />
        </Modal>
    );
}