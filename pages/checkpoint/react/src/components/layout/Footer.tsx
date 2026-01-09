export const Footer = () => {
  const links = [
    'Meta',
    'About',
    'Blog',
    'Jobs',
    'Help',
    'API',
    'Privacy',
    'Terms',
    'Locations',
    'Instagram Lite',
    'Threads',
    'Contact Uploading & Non-Users',
    'Meta Verified',
  ]

  return (
    <footer className="w-full max-w-5xl mx-auto px-4 py-6 mt-12">
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-4">
        {links.map((link, index) => (
          <a
            key={index}
            href="#"
            className="text-xs text-gray-500 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            {link}
          </a>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
        <select className="bg-transparent border-none text-xs text-gray-500 cursor-pointer focus:outline-none">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
        <span>© 2026 Instagram from Meta</span>
      </div>
    </footer>
  )
}
