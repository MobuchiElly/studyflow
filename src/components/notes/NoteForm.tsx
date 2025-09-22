'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Note } from '@/types/note';
import { Topic } from '@/types/topic';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  content: z.string().optional(),
  topic_id: z.string().uuid().nullable().optional(),
});

/**
 * Props for the NoteForm component.
 * @typedef {object} NoteFormProps
 * @property {Note} [initialData] - Optional initial data to pre-fill the form fields.
 * @property {(data: z.infer<typeof formSchema>) => void} onSubmit - Callback function to handle form submission.
 * @property {boolean} isLoading - Indicates if the form is currently submitting, disabling the submit button.
 * @property {Topic[]} topics - An array of available topics to display in the topic selection dropdown.
 */
interface NoteFormProps {
  initialData?: Note;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
  topics: Topic[];
}

/**
 * Renders a form for creating or editing a note.
 * This component allows users to input a note title, content, and select an optional topic.
 * It handles form validation using Zod and integrates with react-hook-form.
 *
 * @param {NoteFormProps} props - The properties for the component.
 * @returns {JSX.Element} The Note Form component.
 */
export function NoteForm({ initialData, onSubmit, isLoading, topics }: NoteFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      topic_id: initialData?.topic_id || null,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter note title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter note content (optional)"
                  {...field}
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || ''} disabled={topics.length === 0}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={topics.length > 0 ? "Select a topic (optional)" : "No topics available"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {topics.length > 0 ? (
                    topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-topics" disabled>
                      No topics created yet
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Note'}
        </Button>
      </form>
    </Form>
  );
}