export default function Hero() {
    return (
      <section className="flex flex-col items-center justify-center text-center mt-40 px-6">
  
  <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
            Your AI-Powered
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
  Learning Assistant
</span>        </h1>
  
        <p className="text-gray-400 text-xl max-w-2xl mb-8">
          Upload notes, chat with PDFs, generate quizzes,
          and learn smarter using AI.
        </p>
  
        <div className="flex gap-4">
  
          <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
            Get Started
          </button>
  
          <button className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-900 transition">
            Learn More
          </button>
  
        </div>
  
      </section>
    );
  }