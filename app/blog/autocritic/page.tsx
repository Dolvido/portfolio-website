import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function AutoCriticBlog() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="text-blue-500 dark:text-blue-400 mb-4 inline-block hover:underline">
            ← Back to Blog
          </Link>

          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            AutoCritic: Local AI-Powered Code Review
          </h1>
          
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            April 2023 • 8 min read
          </div>
          
          {/* AutoCritic Demo UI with Home button */}
          <div className="mt-4 mb-8 mx-auto relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
              <div className="font-bold text-xl">Auto-Critic</div>
            </div>
            <div className="flex bg-slate-900 text-white min-h-[200px]">
              <div className="w-1/2 border-r border-slate-700 p-4">
                <h3 className="text-lg font-medium mb-3">Code Input</h3>
                <div className="bg-slate-800 rounded p-3 text-sm font-mono h-32 overflow-hidden">
                  <div className="text-green-400">def analyze_code(file_path):</div>
                  <div className="text-blue-300">    """Analyze the code for potential issues."""</div>
                  <div className="text-slate-400">    # Implementation here</div>
                  <div className="text-yellow-300">    return {`{"issues": [], "suggestions": []}`}</div>
                </div>
              </div>
              <div className="w-1/2 p-4">
                <h3 className="text-lg font-medium mb-3">Code Critique</h3>
                <div className="bg-slate-800 rounded p-3 text-sm h-32 overflow-hidden">
                  <p className="text-slate-300">Missing docstring parameter descriptions.</p>
                  <p className="text-slate-300 mt-2">Consider implementing error handling.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              AutoCritic is a privacy-focused tool that leverages AI to generate insights about your software engineering projects
              while keeping all your code private and running entirely on your local machine.
            </p>

            <h2>The Problem</h2>
            <p>
              As a developer, I wanted a tool that could help me analyze my code, identify potential issues, and suggest improvements—without
              uploading my code to external servers or compromising my intellectual property. Existing solutions often require sending
              code to cloud-based servers, which raises privacy and security concerns.
            </p>

            <h2>The Solution</h2>
            <p>
              AutoCritic was designed with privacy as a core principle. It runs entirely on your local machine, using Ollama to power
              local large language models (LLMs) like Mistral, LLaMA2, and Code LLaMA. This architecture ensures that your code never
              leaves your computer.
            </p>

            <h2>How It Works</h2>
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg my-8">
              <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>LLM:</strong> Ollama (Mistral, LLaMA2, Code LLaMA)</li>
                <li><strong>Prompt orchestration:</strong> LangChain</li>
                <li><strong>Git diff capture:</strong> Pre-commit hook / GitPython</li>
                <li><strong>Feedback engine:</strong> Python agent (CLI or VSCode extension)</li>
                <li><strong>Learning loop (optional):</strong> Vector store (Chroma), fine-tuned scoring</li>
                <li><strong>GUI:</strong> React/Next.js or VSCode WebView</li>
              </ul>
            </div>

            <p>
              AutoCritic analyzes your codebase at multiple levels:
            </p>

            <ol className="list-decimal pl-6 space-y-4 my-6">
              <li>
                <strong>Git Diff Analysis:</strong> It captures changes through Git diffs or pre-commit hooks, providing targeted feedback on recent changes.
              </li>
              <li>
                <strong>File-Level Analysis:</strong> It examines individual files to identify code quality issues, security vulnerabilities, and style inconsistencies.
              </li>
              <li>
                <strong>Project-Level Analysis:</strong> It provides high-level insights into the architecture, dependencies, and overall structure of your codebase.
              </li>
              <li>
                <strong>Learning Loop:</strong> Optionally, it can store feedback in a vector database to improve suggestions over time, still maintaining privacy.
              </li>
            </ol>

            <div className="space-y-8 my-8">
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">Single File Review</p>
                <Image 
                  src="/images/blog/AutoCritic/AutoCritic - Single File Review.png"
                  alt="AutoCritic Single File Review"
                  width={800}
                  height={450}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 shadow-md"
                />
              </div>
              
              <div>
                <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">Analysis Results</p>
                <Image 
                  src="/images/blog/AutoCritic/AutoCritic - Analysis Results.png"
                  alt="AutoCritic Analysis Results" 
                  width={800}
                  height={450}
                  className="rounded-lg border border-slate-200 dark:border-slate-700 shadow-md"
                />
              </div>
            </div>

            <h2>Key Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>100% Local Processing:</strong> All code analysis happens on your machine.</li>
              <li><strong>Customizable Feedback:</strong> Configure the type and depth of insights you want.</li>
              <li><strong>Multiple LLM Support:</strong> Choose from various local models based on your needs.</li>
              <li><strong>Pre-Commit Integration:</strong> Get feedback before committing changes.</li>
              <li><strong>CLI and IDE Support:</strong> Use it in your terminal or VSCode.</li>
              <li><strong>Performance Optimization:</strong> Designed to work efficiently with local resources.</li>
            </ul>

            <h2>Development Challenges</h2>
            <p>
              Building AutoCritic presented several interesting challenges:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Prompt Engineering:</strong> Crafting effective prompts to get useful code insights without sending too much context.
              </li>
              <li>
                <strong>Resource Management:</strong> Ensuring the tool is efficient enough to run on consumer hardware.
              </li>
              <li>
                <strong>Model Selection:</strong> Finding the right balance between model size and performance.
              </li>
              <li>
                <strong>Integration:</strong> Making the tool work seamlessly with existing development workflows.
              </li>
            </ul>

            <h2>Try It Yourself</h2>
            <p>
              AutoCritic is an open-source project available on GitHub. It's designed to be easy to set up and use, requiring
              minimal configuration. You'll need:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Python 3.8+</li>
              <li>Ollama installed locally</li>
              <li>Git for version control integration</li>
            </ul>

            <div className="bg-slate-950 text-slate-200 p-4 rounded-md font-mono text-sm my-6 overflow-x-auto relative shadow-lg shadow-slate-900/20 border border-slate-800">
              <div className="flex items-center justify-start absolute top-0 left-0 right-0 h-7 bg-slate-800 rounded-t-md px-3">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-center mx-auto text-slate-300">Terminal</span>
              </div>
              <div className="pt-8 pb-1">
                <pre className="text-sm leading-relaxed"><code><span className="text-green-500">$ git clone</span> <span className="text-blue-400">https://github.com/Dolvido/AutoCritic</span><span className="text-green-500"> && cd</span> <span className="text-yellow-400">AutoCritic</span> <span className="text-green-500">&& pip install</span> <span className="text-cyan-400">-r requirements.txt</span> <span className="text-green-500">&& python</span> <span className="text-purple-400">setup.py</span></code></pre>
              </div>
            </div>

            <p>
              Check out the <a href="https://github.com/Dolvido/AutoCritic" className="text-blue-500 hover:underline">GitHub repository</a> for detailed
              installation instructions and documentation.
            </p>

            <h2>Future Directions</h2>
            <p>
              I'm actively working on improving AutoCritic with features like:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Enhanced multi-language support</li>
              <li>More detailed security analysis</li>
              <li>Better integration with CI/CD pipelines</li>
              <li>Improved performance with optimization techniques</li>
              <li>Support for additional IDE extensions</li>
            </ul>

            <p>
              If you're interested in contributing to the project or have suggestions for improvements,
              please feel free to create an issue or submit a pull request on GitHub.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 