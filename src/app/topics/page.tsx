'use client'; // Add 'use client' directive as we're using useState

import React, { useState } from 'react';
import TopicList from '@/components/topics/TopicList';
import TopicForm from '@/components/topics/TopicForm';
import Modal from '@/components/ui/Modal'; // Import the Modal component

export default function TopicsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTopicCreated = () => {
    setIsModalOpen(false);
    // In a real application, you would re-fetch the topic list here
    // or update the state to show the newly created topic.
    // For now, we'll just close the modal.
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Topics</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create New Topic
        </button>
      </div>

      <TopicList />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Topic"
      >
        <TopicForm />
      </Modal>
    </div>
  );
}