import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Topic } from "@/types/topic";
// import { format } from "date-fns";

interface TopicCardProps {
  topic: Topic;
  onEdit: (topic: Topic) => void;
  onDelete: (topicId: string) => void;
  isDeleting: boolean;
}

export function TopicCard({ topic, onEdit, onDelete, isDeleting }: TopicCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{topic.title}</CardTitle>
        <CardDescription className="line-clamp-2">{topic.description || "No description provided."}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        {/* <span className="text-sm text-gray-500">
          Created: {format(new Date(topic.created_at), "MMM d, yyyy")}
        </span> */}
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