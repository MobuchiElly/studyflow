import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Target, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
        Welcome to <span className="text-[#3B82F6]">StudyFlow</span>!
      </h1>
      <p className="text-lg text-center text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
        StudyFlow is your learning companion. Capture notes, organize topics, and connect your ideas into a structured study system. Let’s get started with some examples.
      </p>

      {/* Examples Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Notes Example */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 mx-auto mb-6">
            <BookOpen className="w-7 h-7 text-[#3B82F6]" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Create and Manage Notes</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Jot down lecture summaries, personal insights, or research findings.
            Example: <span className="italic">“Key points from Chapter 5: Photosynthesis”</span> or <span className="italic">“JavaScript Array Methods Cheat Sheet.”</span>
          </p>
          <Button asChild className="w-full md:w-auto">
            <Link href="/dashboard/notes" className="flex items-center gap-2">
              Go to Notes <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Topics Example */}
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 mx-auto mb-6">
            <Target className="w-7 h-7 text-[#3B82F6]" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Organize with Topics</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Group notes and resources into focused areas for better retention.
            Example: <span className="italic">“Biology Exam Prep”</span> or <span className="italic">“Frontend Development”</span> topic with linked notes and practice questions.
          </p>
          <Button asChild className="w-full md:w-auto">
            <Link href="/dashboard/topics" className="flex items-center gap-2">
              Go to Topics <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-gray-700 mb-3 text-lg">Ready to supercharge your learning?</p>
        <p className="text-xl font-bold mb-6">
          Start by creating your first <span className="text-[#3B82F6]">note</span> or <span className="text-[#3B82F6]">topic</span> today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="px-8 py-6 text-lg">
            <Link href="/dashboard/notes">
              Create a Note <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg">
            <Link href="/dashboard/topics">
              Create a Topic <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}