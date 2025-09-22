import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from "lucide-react";

/**
 * Props for the NoteHeader component.
 * @typedef {object} NoteHeaderProps
 * @property {() => void} onOpenCreateModal - Callback function to open the create note modal.
 */
interface NoteHeaderProps {
  onOpenCreateModal: () => void;
}

/**
 * Renders the header section for the notes page, including a title and a button
 * to create a new note.
 *
 * @param {NoteHeaderProps} props - The properties for the component.
 * @returns {JSX.Element} The Note Header component.
 */
export default function NoteHeader({ onOpenCreateModal }: NoteHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">My Notes</h1>
      <Button onClick={onOpenCreateModal}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create New Note
      </Button>
    </div>
  );
};