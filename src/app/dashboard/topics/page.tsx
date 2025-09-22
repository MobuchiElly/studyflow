'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Topic } from '@/types/topic';
import TopicHeader from '@/components/topics/TopicHeader';
import TopicList from '@/components/topics/TopicList';
import CreateTopicModal from '@/components/topics/CreateTopicModal';
import EditTopicModal from '@/components/topics/EditTopicModal';
import { toast } from 'sonner';

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [creatingTopic, setCreatingTopic] = useState(false);
  const [updatingTopic, setUpdatingTopic] = useState(false);
  const [deletingTopicId, setDeletingTopicId] = useState<string | null>(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/topics');
      setTopics(response.data);
    } catch (error) {
      toast.error('Failed to fetch topics.');
      console.error('Failed to fetch topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTopic = async (newTopic: Omit<Topic, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      setCreatingTopic(true);
      const response = await axios.post('/api/topics', newTopic);
      setTopics((prev) => [...prev, response.data]);
      toast.success('Topic created successfully!');
      setIsCreateModalOpen(false);
    } catch (error) {
      toast.error('Failed to create topic.');
      console.error('Failed to create topic:', error);
    } finally {
      setCreatingTopic(false);
    }
  };

  const handleEditTopic = async (updatedTopic: Topic) => {
    try {
      setUpdatingTopic(true);
      const response = await axios.put(`/api/topics/${updatedTopic.id}`, updatedTopic);
      setTopics((prev) => prev.map((t) => (t.id === updatedTopic.id ? response.data : t)));
      toast.success('Topic updated successfully!');
      setIsEditModalOpen(false);
      setEditingTopic(null);
    } catch (error) {
      toast.error('Failed to update topic.');
      console.error('Failed to update topic:', error);
    } finally {
      setUpdatingTopic(false);
    }
  };

  const handleDeleteTopic = async (id: string) => {
    try {
      setDeletingTopicId(id);
      const response = await axios.delete(`/api/topics/${id}`);
      if (response.status === 200) {
        setTopics((prev) => prev.filter((t) => t.id !== id));
        toast.success('Topic deleted successfully!');
      }
      setTopics((prev) => prev.filter((t) => t.id !== id));
      toast.success('Topic deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete topic.');
      console.error('Failed to delete topic:', error);
    } finally {
      setDeletingTopicId(null);
    }
  };

  const openEditModal = (topic: Topic) => {
    setEditingTopic(topic);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <TopicHeader onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {loading ? (
        <div className="text-center">Loading topics...</div>
      ) : (
        <TopicList
          topics={topics}
          onEditTopic={openEditModal}
          onDeleteTopic={handleDeleteTopic}
          deletingTopicId={deletingTopicId}
        />
      )}

      <CreateTopicModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onTopicCreated={handleCreateTopic}
        loading={creatingTopic}
      />

      {editingTopic && (
        <EditTopicModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTopic(null);
          }}
          topic={editingTopic}
          onTopicEdited={handleEditTopic}
          loading={updatingTopic}
        />
      )}
    </div>
  );
}