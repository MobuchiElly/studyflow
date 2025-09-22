import { TopicCard } from "./TopicCard";
import { Topic } from "@/types/topic";

interface TopicListProps {
    /**
     * An array of `Topic` objects to be displayed in the list.
     */
    topics: Topic[];
    /**
     * Callback function to be invoked when a topic's edit action is triggered.
     * @param topic The topic object to be edited.
     */
    onEditTopic: (topic: Topic) => void;
    /**
     * Callback function to be invoked when a topic's delete action is triggered.
     * @param topicId The ID of the topic to be deleted.
     */
    onDeleteTopic: (topicId: string) => void;
    /**
     * The ID of the topic currently being deleted. Used to show a loading state for that specific topic card.
     * Can be `null` if no topic is currently being deleted.
     */
    deletingTopicId: string | null;
}

/**
 * `TopicList` is a React functional component that displays a grid of `TopicCard` components.
 * It handles the rendering of multiple study topics and provides actions for editing and deleting them.
 * If no topics are available, it displays a message to the user.
 *
 * @param {TopicListProps} props - The properties for the component.
 * @returns {JSX.Element} A grid of topic cards or a message if no topics are found.
 */
export default function TopicList({
    topics,
    onEditTopic,
    onDeleteTopic,
    deletingTopicId,
}: TopicListProps) {
    if (topics.length === 0) {
        return (
            <p className="text-center text-gray-500">No topics found. Create one to get started!</p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
                <TopicCard
                    key={topic.id}
                    topic={topic}
                    onEdit={onEditTopic}
                    onDelete={onDeleteTopic}
                    isDeleting={deletingTopicId === topic.id}
                />
            ))}
        </div>
    );
}