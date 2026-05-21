const features = [
    {
      title: "Chat With PDFs",
      description:
        "Upload study materials and ask questions using AI-powered document chat.",
    },
    {
      title: "AI Quiz Generation",
      description:
        "Generate quizzes and practice questions instantly from your notes.",
    },
    {
      title: "Smart Summaries",
      description:
        "Get concise AI-generated summaries for faster learning.",
    },
  ];
  
  export default function Features() {
    return (
      <section className="px-6 py-32">
  
        <div className="text-center mb-16">
  
          <h2 className="text-4xl font-bold mb-4">
            Powerful AI Features
          </h2>
  
          <p className="text-gray-400 text-lg">
            Everything you need to learn smarter.
          </p>
  
        </div>
  
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
  
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-gray-800 bg-gray-950 p-8 rounded-2xl hover:border-blue-500 transition"
            >
  
              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>
  
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
  
            </div>
          ))}
  
        </div>
  
      </section>
    );
  }