import { z } from "zod";

export const NoteSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  topic_id: z.string().uuid().nullable().optional(), // Added topic_id
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type Note = z.infer<typeof NoteSchema>;

export interface NoteListProps {
    notes: Note[];
    onEditNote: (note: Note) => void;
    onDeleteNote: (noteId: string) => void;
    deletingNoteId: string | null;
    loading: boolean;
}

export interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
  isDeleting: boolean;
}


