import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-8 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p className="mb-2">
          Crafted with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="https://watcharachaisk.github.io/profile/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-800 hover:text-blue-600 transition-colors underline-offset-4 hover:underline"
          >
            Watcharachai S.
          </a>
        </p>
        <p className="text-sm">
          © {new Date().getFullYear()} tax_ease.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
