export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white text-center mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} StudyFlow. All rights reserved.</p>
      </div>
    </footer>
  );
}