import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Target, ArrowRight, CheckCircle } from "lucide-react"

/**
 * Renders the main landing page of the StudyFlow application.
 * This component includes a hero section, a features section highlighting
 * note organization and topic management, and a call-to-action section.
 *
 * @returns {JSX.Element} The Home page component.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-[#3B82F6] px-4 py-1.5 rounded-full text-sm font-medium mb-8">
              <CheckCircle className="w-4 h-4" />
              <span>Trusted by Students Worldwide</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Master Your Studies with{" "}
              <span className="text-[#3B82F6]">StudyFlow</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              All-in-one platform to capture notes, manage topics, and track your progress—so you can focus on learning, not juggling tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard/notes">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent"
              >
                <Link href="/dashboard/topics">Live Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Powerful, intuitive tools designed to help you stay organized, study smarter, and achieve your academic goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-10">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <BookOpen className="w-7 h-7 text-[#3B82F6]" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Smart Note Organization</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Capture ideas, lectures, and key insights effortlessly with automatic categorization and advanced search.
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="p-0 h-auto text-[#3B82F6] hover:text-[#3B82F6]/80"
                >
                  <Link href="/dashboard/notes" className="flex items-center gap-2">
                    Explore Notes <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-10">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Target className="w-7 h-7 text-[#3B82F6]" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Focused Topic Management</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Organize your learning into topics for structured study sessions, sharper focus, and better retention.
                </p>
                <Button
                  asChild
                  variant="ghost"
                  className="p-0 h-auto text-[#3B82F6] hover:text-[#3B82F6]/80"
                >
                  <Link href="/dashboard/topics" className="flex items-center gap-2">
                    Manage Topics <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Join thousands of students who are already studying smarter and achieving more with StudyFlow.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/dashboard/notes">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
