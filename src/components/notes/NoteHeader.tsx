import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from "lucide-react";

interface NoteHeaderProps {
  onOpenCreateModal: () => void;
}

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