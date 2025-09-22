import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NoteCardProps } from "@/types/note";

/**
 * Renders a single note as a card, displaying its title, a truncated version of its content,
 * creation date, and action buttons for editing and deleting the note.
 *
 * @param {NoteCardProps} props - The properties for the component.
 * @param {Note} props.note - The note object to display.
 * @param {(note: Note) => void} props.onEdit - Callback function to be called when the edit button is clicked.
 * @param {(id: string) => void} props.onDelete - Callback function to be called when the delete button is clicked.
 * @param {boolean} props.isDeleting - Indicates if the note is currently being deleted, disabling the delete button.
 * @returns {JSX.Element} A card component representing a note.
 */
export function NoteCard({ note, onEdit, onDelete, isDeleting }: NoteCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription className="line-clamp-2">{note.content || "No content provided."}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        {/* <span className="text-sm text-gray-500">
          Created: {format(new Date(note.created_at), "MMM d, yyyy")}
        </span> */}
        <span className="text-sm text-gray-500">
          Created: {note.created_at}
        </span>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(note)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(note.id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}