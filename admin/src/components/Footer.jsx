export default function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm">© 2024 LimaCodes . All rights reserved.</div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-500"
          >
            Privacy Policy
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="#"
            className="hover:text-primary-500"
          >
            Terms of Service
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://lima-theta.vercel.app"
            className="hover:text-primary-500"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
