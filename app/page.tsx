'use client';

import { useState } from 'react';

export default function Home() {
  const [projectContext, setProjectContext] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePost = async () => {
    setLoading(true);
    setCopied(false);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectContext }),
      });

      const data = await response.json();

      if (data.post) {
        setGeneratedPost(data.post);
      } else {
        setGeneratedPost('Error generating post. Please try again.');
      }
    } catch (error) {
      setGeneratedPost('Error generating post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Design Arena 🎨
          </h1>
          <p className="text-xl text-gray-600">
            AI-Powered LinkedIn Content Generator
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            Project Context
          </label>
          <textarea
            className="w-full h-40 p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none text-gray-800"
            placeholder="Describe your design project, creative insight, or design tip. For example: 'We just completed a redesign for a fintech app that simplifies money management. Our focus was clean UI, accessible typography, and intuitive use.'"
            value={projectContext}
            onChange={(e) => setProjectContext(e.target.value)}
          />

          <button
            onClick={generatePost}
            disabled={loading || !projectContext.trim()}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating...
              </span>
            ) : (
              '✨ Generate LinkedIn Post'
            )}
          </button>
        </div>

        {generatedPost && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Your LinkedIn Post
              </h2>
              <button
                onClick={copyToClipboard}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-medium transition-all"
              >
                {copied ? '✓ Copied!' : '📋 Copy'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
              <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                {generatedPost}
              </pre>
            </div>
          </div>
        )}

        <footer className="text-center mt-12 text-gray-600">
          <p>Powered by AI • Design Arena © 2024</p>
        </footer>
      </div>
    </div>
  );
}
