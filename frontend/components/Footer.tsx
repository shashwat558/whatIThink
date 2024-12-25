export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-500 text-sm">
          © {currentYear} Shashwat. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

