import { Modal } from "@/components/ui/Modal";
import { TopicForm } from "./TopicForm";
import { Topic } from "@/types/topic";
import { z } from "zod";

interface EditTopicModalProps {
    /**
     * Controls the visibility of the modal.
     */
    isOpen: boolean;
    /**
     * Callback function to be invoked when the modal is closed.
     */
    onClose: () => void;
    /**
     * The topic data to be edited.
     */
    topic: Topic;
    /**
     * Callback function to be invoked when the topic is successfully edited.
     * @param topic - The updated topic object.
     */
    onTopicEdited: (topic: Topic) => void;
    /**
     * Indicates whether a topic editing operation is currently in progress.
     */
    loading: boolean;
}

/**
 * `EditTopicModal` is a React functional component that renders a modal
 * for editing an existing study topic. It utilizes the `Modal` component for
 * its structure and the `TopicForm` component for handling topic input,
 * pre-filled with the existing topic's data.
 *
 * @param {EditTopicModalProps} props - The properties for the component.
 * @returns {JSX.Element} A modal dialog containing a form for editing a topic.
 */
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