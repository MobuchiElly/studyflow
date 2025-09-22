import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <h1 className="text-9xl font-extrabold text-primary-500 dark:text-primary-400 tracking-widest">
                404
            </h1>
            <div className="bg-secondary-600 px-2 text-sm rounded rotate-12 absolute">
                Page Not Found
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-center">
                Oops! The page you're looking for doesn't exist.
            </h2>
            <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-400">
                It might have been moved or deleted.
            </p>
            <Link href="/" passHref>
                <Button className="mt-8 px-6 py-3 text-lg font-medium rounded-md transition-colors duration-300">
                    Go back to Home
                </Button>
            </Link>
        </div>
    );
}