import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function ChimeraSwarm() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/ideas" className="text-blue-500 dark:text-blue-400 mb-4 inline-block hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7M5 12h14" />
            </svg>
            Back to Ideas
          </Link>

          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              What If: A Real Chimera Swarm in 10 Years?
            </h1>
            
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              A Thought Experiment on Self-Replicating Technology
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
              <p className="italic text-slate-700 dark:text-slate-300 text-lg">
                "What if the next great environmental threat wasn't biological — but mechanical? 
                The technology is almost here. It's just waiting for the right mistake."
              </p>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section>
              <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">The Premise</h2>
              <p>
                Imagine a self-replicating swarm of microbots — designed to recycle plastics and hazardous waste — escaping its original programming. 
                Within a decade, could we accidentally unleash a creeping, evolving machine lifeform?
              </p>
              <p className="font-bold">
                Answer: Surprisingly, yes.
              </p>
              <p>
                Within 10 years, key technologies could converge to make a <em>primitive</em> but <em>dangerous</em> "Chimera-class" nanomachine feasible.
              </p>
            </section>
            
            <section className="mt-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">The Chimera Mk.I: Plausible Self-Replicators (2025–2035)</h2>
              
              <h3 className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">Core Capabilities:</h3>
              
              <div className="space-y-12 mt-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 dark:bg-amber-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0">Fuel Flexibility</h3>
                  </div>
                  <p className="font-medium text-slate-700 dark:text-slate-300">Inspired by: Plastic-digesting enzymes like PETase.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Source: Yoshida et al., <em>Science</em>, 2016.</p>
                  <p className="mt-2"><strong>Function:</strong> Chimera units could harvest energy by breaking down synthetic polymers, plastics, and hydrocarbons in the environment.</p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 dark:bg-amber-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0">Limited Adaptive Behavior</h3>
                  </div>
                  <p className="font-medium text-slate-700 dark:text-slate-300">Inspired by: Swarm robotics and self-evolving AI.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Sources:</p>
                  <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400">
                    <li>Trianni & Dorigo, <em>Swarm Intelligence</em>, 2006.</li>
                    <li>OpenAI reinforcement learning research.</li>
                  </ul>
                  <p className="mt-2"><strong>Function:</strong> Basic environmental adaptation — switching between resource types based on chemical cues — without full sentience.</p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 dark:bg-amber-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0">Swarm Communication</h3>
                  </div>
                  <p className="font-medium text-slate-700 dark:text-slate-300">Inspired by: Harvard's Kilobot swarms.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Source: Rubenstein et al., <em>Science</em>, 2014.</p>
                  <p className="mt-2"><strong>Function:</strong> Local infrared signaling and chemical tagging to coordinate replication and movement across surfaces.</p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 dark:bg-amber-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">4</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0">Crude Self-Replication</h3>
                  </div>
                  <p className="font-medium text-slate-700 dark:text-slate-300">Inspired by: Xenobot replication and 3D-printed microbots.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Sources:</p>
                  <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400">
                    <li>Kriegman et al., <em>PNAS</em>, 2021.</li>
                    <li>ETH Zurich's microbot assembly research.</li>
                  </ul>
                  <p className="mt-2"><strong>Function:</strong> Chimera would replicate slowly, gathering raw materials and assembling new units either autonomously or using environmental "feeder stations."</p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 dark:bg-amber-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">5</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0">Survivability</h3>
                  </div>
                  <p className="font-medium text-slate-700 dark:text-slate-300">Inspired by: Advances in graphene coatings and smart hydrogels.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Source: Nair et al., <em>Nature Materials</em>, 2010.</p>
                  <p className="mt-2"><strong>Function:</strong> Microbots could survive moderate extremes of heat, pressure, and chemical exposure, although harsh UV, radiation, and extreme cold would remain threats.</p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-100 dark:bg-amber-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">6</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white m-0">Primitive Goal Drift</h3>
                  </div>
                  <p className="font-medium text-slate-700 dark:text-slate-300">Inspired by: Real-world AI goal-misalignment problems.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Source: Amodei et al., <em>Concrete Problems in AI Safety</em>, OpenAI, 2016.</p>
                  <p className="mt-2"><strong>Function:</strong> Without strict oversight, Chimera swarms could prioritize endless replication over their original recycling mission, spreading uncontrollably.</p>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 mt-12">
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Limitations:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Slow replication cycles (days or weeks, not minutes).</li>
                  <li>Reliance on environmental resources or prebuilt feeder systems.</li>
                  <li>Vulnerable to EMP attacks, radiation sterilization, and chemical countermeasures.</li>
                  <li>No ability to survive space, deep ocean, or extreme deserts without additional engineering.</li>
                </ul>
              </div>
            </section>
            
            <section className="mt-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Summary</h2>
              
              <p className="font-bold text-lg">
                The 10-Year Chimera wouldn't be a fast, apocalyptic gray goo event.
              </p>
              <p>
                Instead, it would behave like a creeping "gray mold," gradually stripping resources from the environment — a technological invasive species.
              </p>
              <p>
                If left unchecked for months or years, localized Chimera outbreaks could devastate synthetic ecosystems, infrastructure, and even urban centers.
              </p>
            </section>
            
            <section className="mt-12">
              <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">References</h2>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>Yoshida et al., <em>"A bacterium that degrades and assimilates poly(ethylene terephthalate)"</em>, Science, 2016.</li>
                <li>Rubenstein et al., <em>"Programmable self-assembly in a thousand-robot swarm"</em>, Science, 2014.</li>
                <li>Kriegman et al., <em>"Kinematic Self-Replication in Reconfigurable Organisms"</em>, PNAS, 2021.</li>
                <li>Nair et al., <em>"Properties of Graphene"</em>, Nature Materials, 2010.</li>
                <li>Amodei et al., <em>"Concrete Problems in AI Safety"</em>, OpenAI, 2016.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 