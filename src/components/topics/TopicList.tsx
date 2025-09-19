'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Assuming you'll use this later

interface Topic {
  id: string;
  title: string;
  description?: string;
  created_at: string;
}

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      setError(null);
      try {
        // For now, we'll use mock data. Later, this will fetch from Supabase.
        const mockTopics: Topic[] = [
          { id: '1', title: 'Introduction to React', description: 'Basic concepts of React.js', created_at: new Date().toISOString() },
          { id: '2', title: 'Advanced JavaScript', description: 'Deep dive into JS features', created_at: new Date().toISOString() },
        ];
        setTopics(mockTopics);
      } catch (err) {
        setError('Failed to fetch topics.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) return <p>Loading topics...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (topics.length === 0) return <p>No topics found. Create one!</p>;

  return (
    <div className="space-y-4">
      {/* <h2 className="text-2xl font-bold">Your Topics</h2> */}
      {topics.map((topic) => (
        <div key={topic.id} className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold">{topic.title}</h3>
          {topic.description && <p className="text-gray-600">{topic.description}</p>}
          <p className="text-sm text-gray-400">Created: {new Date(topic.created_at).toLocaleDateString()}</p>
          {/* Add edit/delete buttons here later */}
        </div>
      ))}
    </div>
  );
};

export default TopicList;