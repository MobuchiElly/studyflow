import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface TopicHeaderProps {
    onOpenCreateModal: () => void;
}

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