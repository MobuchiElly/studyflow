import { TopicCard } from "./TopicCard";
import { Topic } from "@/types/topic";

interface TopicListProps {
    topics: Topic[];
    onEditTopic: (topic: Topic) => void;
    onDeleteTopic: (topicId: string) => void;
    deletingTopicId: string | null;
}

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