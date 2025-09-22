import { Modal } from "@/components/ui/Modal";
import { TopicForm } from "./TopicForm";
import { z } from "zod";

interface CreateTopicModalProps {
    /**
     * Controls the visibility of the modal.
     */
    isOpen: boolean;
    /**
     * Callback function to be invoked when the modal is closed.
     */
    onClose: () => void;
    /**
     * Callback function to be invoked when a new topic is successfully created.
     * @param data - An object containing the title and description of the created topic.
     */
    onTopicCreated: (data: { title: string; description: string }) => void;
    /**
     * Indicates whether a topic creation operation is currently in progress.
     */
    loading: boolean;
}

/**
 * `CreateTopicModal` is a React functional component that renders a modal
 * for creating a new study topic. It utilizes the `Modal` component for
 * its structure and the `TopicForm` component for handling topic input.
 *
 * @param {CreateTopicModalProps} props - The properties for the component.
 * @returns {JSX.Element} A modal dialog containing a form for creating a new topic.
 */
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