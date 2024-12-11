import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'

export function AppBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="w-screen">
        
        <nav>
          <ul className="flex space-x-4 w-full fixed top-[20px] left-[90%]">
            <li>
              <SocialLink href="https://github.com/shashwat558" icon={Github} label="GitHub"/>
            </li>
            <li>
              <SocialLink href="https://linkedin.com/in/shashwat-jain-8b2b3127a" icon={Linkedin} label="LinkedIn" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ElementType
  label: string
}

function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-primary/80 transition-all duration-300 ease-in-out transform hover:scale-110"
      aria-label={label}
    >
      <Icon className="w-6 h-6 " />
    </Link>
  )
}

