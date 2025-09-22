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
import { Topic } from '@/types/topic';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  description: z.string().optional(),
});

interface TopicFormProps {
  /**
   * Optional initial data to pre-fill the form fields when editing a topic.
   */
  initialData?: Topic;
  /**
   * Callback function to be invoked when the form is submitted.
   * @param data - The form data, including title and description.
   */
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  /**
   * Indicates whether the form is currently in a loading state (e.g., submitting data).
   */
  isLoading: boolean;
}

/**
 * `TopicForm` is a React functional component that provides a form for creating or editing a study topic.
 * It uses `react-hook-form` for form management and `zod` for validation.
 * The form includes fields for the topic's title and an optional description.
 *
 * @param {TopicFormProps} props - The properties for the component.
 * @returns {JSX.Element} A form component for topic creation or editing.
 */
export function TopicForm({ initialData, onSubmit, isLoading }: TopicFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
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
                <Input placeholder="Enter topic title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter topic description (optional)"
                  {...field}
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Topic'}
        </Button>
      </form>
    </Form>
  );
}