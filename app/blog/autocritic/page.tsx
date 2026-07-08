import Image from "next/image";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import ArticleChrome, { ArticleSection, NumberedPanel } from "../../components/ArticleChrome";

export default function AutoCriticBlog() {
  return (
    <div className="portfolio-shell">
      <Navigation />

      <ArticleChrome
        backHref="/blog"
        backLabel="Back to blog"
        eyebrow="POST-001 / April 2023 / 8 min read"
        title="AutoCritic: Local AI-Powered Code Review"
        subtitle="A privacy-focused tool for generating insights about software engineering projects while keeping all code local."
      >
        <div className="border border-[var(--ink)]">
          <div className="flex items-center justify-between border-b border-[var(--ink)] bg-[var(--ink)] px-5 py-3 text-[var(--paper)]">
            <div className="text-sm font-bold uppercase">Auto-Critic</div>
            <div className="text-xs uppercase text-[var(--paper-deep)]">Local review console</div>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="border-b border-[var(--rule)] p-5 md:border-b-0 md:border-r">
              <h2 className="mb-3 text-sm font-bold uppercase">Code Input</h2>
              <pre className="overflow-x-auto border border-[var(--rule)] bg-[rgba(231,227,216,0.65)] p-4 text-xs leading-6">
                <code>{`def analyze_code(file_path):
    \"\"\"Analyze the code for potential issues.\"\"\"
    # Implementation here
    return {\"issues\": [], \"suggestions\": []}`}</code>
              </pre>
            </div>
            <div className="p-5">
              <h2 className="mb-3 text-sm font-bold uppercase">Code Critique</h2>
              <div className="min-h-36 border border-[var(--rule)] bg-[rgba(231,227,216,0.65)] p-4 text-sm leading-7 text-[var(--muted)]">
                <p>Missing docstring parameter descriptions.</p>
                <p className="mt-3">Consider implementing error handling.</p>
              </div>
            </div>
          </div>
        </div>

        <ArticleSection label="00 / Problem" title="The Problem">
          <p>
            As a developer, I wanted a tool that could analyze code, identify potential issues, and suggest
            improvements without uploading source code to external servers or compromising intellectual property.
          </p>
        </ArticleSection>

        <ArticleSection label="01 / Solution" title="The Solution">
          <p>
            AutoCritic runs entirely on your local machine, using Ollama to power local large language models like
            Mistral, LLaMA2, and Code LLaMA. This architecture keeps source code on the developer&apos;s computer.
          </p>
        </ArticleSection>

        <ArticleSection label="02 / Stack" title="How It Works">
          <div className="grid border border-[var(--ink)] md:grid-cols-2">
            {[
              ["LLM", "Ollama: Mistral, LLaMA2, Code LLaMA"],
              ["Prompt orchestration", "LangChain"],
              ["Git diff capture", "Pre-commit hook / GitPython"],
              ["Feedback engine", "Python agent, CLI, and VSCode extension"],
              ["Learning loop", "Optional vector store with Chroma"],
              ["Interface", "React / Next.js or VSCode WebView"],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={`p-4 ${index % 2 === 0 ? "md:border-r" : ""} ${
                  index < 4 ? "border-b" : ""
                } border-[var(--rule)]`}
              >
                <div className="text-xs font-semibold uppercase text-[var(--accent)]">{label}</div>
                <div className="mt-2 text-sm text-[var(--muted)]">{value}</div>
              </div>
            ))}
          </div>

          <NumberedPanel number="1" title="Git Diff Analysis">
            <p>Captures changes through Git diffs or pre-commit hooks, providing targeted feedback on recent work.</p>
          </NumberedPanel>
          <NumberedPanel number="2" title="File-Level Analysis">
            <p>Examines individual files to identify code quality issues, security vulnerabilities, and style drift.</p>
          </NumberedPanel>
          <NumberedPanel number="3" title="Project-Level Analysis">
            <p>Summarizes architecture, dependencies, and overall codebase structure for broader engineering context.</p>
          </NumberedPanel>
        </ArticleSection>

        <ArticleSection label="03 / Screens" title="Interface Examples">
          <div className="space-y-8">
            <figure>
              <figcaption className="mb-3 text-xs font-semibold uppercase text-[var(--faint)]">Single file review</figcaption>
              <Image
                src="/images/blog/AutoCritic/AutoCritic - Single File Review.png"
                alt="AutoCritic Single File Review"
                width={900}
                height={506}
                className="border border-[var(--ink)]"
              />
            </figure>
            <figure>
              <figcaption className="mb-3 text-xs font-semibold uppercase text-[var(--faint)]">Analysis results</figcaption>
              <Image
                src="/images/blog/AutoCritic/AutoCritic - Analysis Results.png"
                alt="AutoCritic Analysis Results"
                width={900}
                height={506}
                className="border border-[var(--ink)]"
              />
            </figure>
          </div>
        </ArticleSection>

        <ArticleSection label="04 / Features" title="Key Features">
          <ul className="list-disc space-y-2 pl-5">
            <li>100% local processing for privacy-sensitive codebases.</li>
            <li>Customizable feedback depth and review categories.</li>
            <li>Multiple local model options depending on hardware and task needs.</li>
            <li>Pre-commit integration for feedback before changes are committed.</li>
            <li>CLI and IDE support for normal development workflows.</li>
          </ul>
        </ArticleSection>

        <ArticleSection label="05 / Try" title="Try It Yourself">
          <p>AutoCritic is open source and designed to be straightforward to set up with Python, Ollama, and Git.</p>
          <pre className="overflow-x-auto border border-[var(--ink)] bg-[var(--ink)] p-4 text-xs leading-6 text-[var(--paper)]">
            <code>{`git clone https://github.com/Dolvido/AutoCritic
cd AutoCritic
pip install -r requirements.txt
python setup.py`}</code>
          </pre>
          <p>
            View the repository at{" "}
            <a href="https://github.com/Dolvido/AutoCritic" className="accent-link" target="_blank" rel="noopener noreferrer">
              github.com/Dolvido/AutoCritic
            </a>
            .
          </p>
        </ArticleSection>
      </ArticleChrome>

      <Footer />
    </div>
  );
}
