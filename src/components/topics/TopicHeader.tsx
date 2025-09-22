import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface TopicHeaderProps {
    /**
     * Callback function to be invoked when the "Create New Topic" button is clicked,
     * typically to open a modal for creating a new topic.
     */
    onOpenCreateModal: () => void;
}

/**
 * `TopicHeader` is a React functional component that renders the header section
 * for the study topics page. It displays a title "My Study Topics" and a button
 * to initiate the creation of a new topic.
 *
 * @param {TopicHeaderProps} props - The properties for the component.
 * @returns {JSX.Element} The header component for the topics page.
 */
export default function TopicHeader({ onOpenCreateModal }: TopicHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Study Topics</h1>
            <Button onClick={onOpenCreateModal} className="flex items-center">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create New Topic
            </Button>
        </div>
    );
}