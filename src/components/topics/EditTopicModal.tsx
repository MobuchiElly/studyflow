import { Modal } from "@/components/ui/Modal";
import { TopicForm } from "./TopicForm";
import { Topic } from "@/types/topic";
import { z } from "zod";

interface EditTopicModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: Topic;
    onTopicEdited: (topic: Topic) => void;
    loading: boolean;
}

export default function EditTopicModal({
    isOpen,
    onClose,
    topic,
    onTopicEdited,
    loading,
}: EditTopicModalProps) {
    const handleSubmit = (data: z.infer<any>) => {
        onTopicEdited({ ...topic, ...data });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Edit Topic: ${topic.title}`}>
            <TopicForm initialData={topic} onSubmit={handleSubmit} isLoading={loading} />
        </Modal>
    );
}