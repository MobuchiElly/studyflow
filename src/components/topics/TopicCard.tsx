import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Topic } from "@/types/topic";

interface TopicCardProps {
  /**
   * The topic object to be displayed in the card.
   */
  topic: Topic;
  /**
   * Callback function to be invoked when the edit button is clicked.
   * @param topic - The topic object to be edited.
   */
  onEdit: (topic: Topic) => void;
  /**
   * Callback function to be invoked when the delete button is clicked.
   * @param topicId - The ID of the topic to be deleted.
   */
  onDelete: (topicId: string) => void;
  /**
   * Indicates whether a delete operation is currently in progress for this topic.
   */
  isDeleting: boolean;
}

/**
 * `TopicCard` is a React functional component that displays a single topic
 * with its title, description, creation date, and action buttons for editing and deleting.
 *
 * @param {TopicCardProps} props - The properties for the component.
 * @returns {JSX.Element} A card component displaying topic information and actions.
 */
export function TopicCard({ topic, onEdit, onDelete, isDeleting }: TopicCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{topic.title}</CardTitle>
        <CardDescription className="line-clamp-2">{topic.description || "No description provided."}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Created: {topic.created_at}
        </span>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(topic)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(topic.id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}