'use client';

import { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { Note } from '@/types/note';
import { Topic } from '@/types/topic'; // Import Topic type
import NoteHeader from '@/components/notes/NoteHeader';
import NoteList from '@/components/notes/NoteList';
import CreateNoteModal from '@/components/notes/CreateNoteModal';
import EditNoteModal from '@/components/notes/EditNoteModal';
import { toast } from 'sonner';


/**
 * Renders the Notes page, displaying a list of notes and providing functionality
 * for creating, editing, and deleting notes. It also fetches and manages topics
 * for note organization.
 *
 * @returns {JSX.Element} The Notes page component.
 */
export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]); // State for topics
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [creatingNote, setCreatingNote] = useState(false);
  const [updatingNote, setUpdatingNote] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/notes');
      setNotes(response.data);
    } catch (error) {
      toast.error('Failed to fetch notes.');
      console.log('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await axios.get('/api/topics');
      setTopics(response.data);
    } catch (error) {
      toast.error('Failed to fetch topics.');
      console.log('Error fetching topics:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchTopics();
  }, []);

  const handleCreateNote = async (newNote: Omit<Note, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      setCreatingNote(true);
      const response = await axios.post('/api/notes', newNote);
      setNotes((prev) => [response.data, ...prev]);
      toast.success('Note created successfully!');
      setIsCreateModalOpen(false);
    } catch (error) {
      toast.error('Failed to create note.');
      console.log('Error creating note:', error);
    } finally {
      setCreatingNote(false);
    }
  };

  const handleEditNote = async (updatedNoteData: { title: string; content?: string; topic_id?: string | null }) => {
    if (!editingNote) {
      toast.error('No note selected for editing.');
      return;
    }
    try {
      setUpdatingNote(true);
      const note_id = editingNote.id;

      const response = await axios.put(`/api/notes/${note_id}`, { ...updatedNoteData, id: note_id });
      if (response.status === 200) {
        setNotes((prev) => prev.map((n) => (n.id === editingNote.id ? response.data : n)));
        toast.success('Note updated successfully!');
        setIsEditModalOpen(false);
        setEditingNote(null);
      }
    } catch (error) {
      toast.error('Failed to update note.');
      console.log('Error updating note:', error);
    } finally {
      setUpdatingNote(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      setDeletingNoteId(id);
      const response = await axios.delete(`/api/notes/${id}`);
      if (response.status === 200) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        toast.success('Note deleted successfully!');
      }
    } catch (error) {
      toast.error('Failed to delete note.');
      console.log('Error deleting note:', error);
    } finally {
      setDeletingNoteId(null);
    }
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <NoteHeader onOpenCreateModal={() => setIsCreateModalOpen(true)} />
      <NoteList
        notes={notes}
        loading={loading}
        onEditNote={openEditModal} // Changed from onEdit to onEditNote
        onDeleteNote={handleDeleteNote} // Changed from onDelete to onDeleteNote
        deletingNoteId={deletingNoteId}
      />

      <CreateNoteModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onNoteCreated={handleCreateNote} // Changed from onCreateNote to onNoteCreated
        loading={creatingNote}
        topics={topics} // Pass topics to CreateNoteModal
      />

      {editingNote && (
        <EditNoteModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingNote(null);
          }}
          note={editingNote}
          onNoteEdited={handleEditNote}
          loading={updatingNote}
          topics={topics}
        />
      )}
    </div>
  );
}