export default function FAQPage() {
    const faqs = [
      {
        question: "What is the product?",
        answer: "Our product helps you build better CVs using smart AI analysis and suggestions.",
      },
      {
        question: "How do I get started?",
        answer: "You can start by uploading your CV on the home page. We'll analyze it and give personalized tips.",
      },
      {
        question: "Is it free?",
        answer: "Yes, our basic CV review is free. Premium features are coming soon.",
      },
      {
        question: "What is the turnaround time for the analysis?",
        answer: "Our AI takes just a few seconds to analyze your CV and give feedback, but the depth of the analysis may vary depending on the length and complexity of your CV.",
      },
      {
        question: "How accurate is the feedback?",
        answer: "Our AI is trained on thousands of CVs and can provide highly accurate and personalized feedback, but human review is still recommended for critical applications.",
      },
      {
        question: "Is my data safe?",
        answer: "Yes, we prioritize your privacy. All data is processed securely, and we don't store your personal information after the analysis is complete.",
      },
    ];
  
    return (
      <div className="min-h-screen bg-black text-white relative z-10">
        <div className="fixed inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600 rounded-full filter blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cyan-500 rounded-full filter blur-[150px] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-fuchsia-500 rounded-full filter blur-[150px] opacity-10"></div>
      </div>

  
        {/* Content */}
        <div className="max-w-3xl mx-auto py-12 px-6 relative z-10">
          <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4">
                <details className="group">
                  <summary className="cursor-pointer text-lg font-medium text-white/80 group-open:text-white">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-white/60">{faq.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  