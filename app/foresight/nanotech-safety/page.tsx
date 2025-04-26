import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function NanotechSafety() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/foresight" className="text-blue-500 dark:text-blue-400 mb-4 inline-block hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7M5 12h14" />
            </svg>
            Back to Foresight
          </Link>

          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Nanotech Safety Blueprint
            </h1>
            
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Principles for Responsible Molecular Engineering
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
              <p className="italic text-slate-700 dark:text-slate-300 text-lg">
                "This blueprint reflects my belief that responsible engineering must precede transformative innovation.
                Before we dream of what nanotech can do, we must first guarantee what it will never do."
              </p>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed mb-10">
              As AI and nanotechnology converge, the principles of safe system design become increasingly important.
              This blueprint extends my work in AI safety to the domain of self-replicating nanomachines, focusing on
              preventative frameworks and multi-layered controls.
            </p>

            {/* Principles with improved styling */}
            <div className="space-y-16">
              {/* Principle 1 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white m-0">Safety-by-Design from Day Zero</h2>
                </div>
                <p className="mt-0 mb-4">All nanosystems must be conceptualized with failure modes mapped before any functional prototypes are constructed.</p>
                <ul className="pl-6 list-disc space-y-2">
                  <li>Anticipate worst-case behaviors, not just ideal outcomes.</li>
                  <li>Design for containment, shutdown, and recovery before any replication or autonomous features are tested.</li>
                </ul>
              </div>

              {/* Principle 2 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white m-0">Multi-Layered Containment and Redundancy</h2>
                </div>
                <p className="mt-0 mb-6">Every self-replicating or self-organizing nanosystem must operate within a triple containment regime:</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <div className="bg-slate-50 dark:bg-slate-700 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Physical Containment</h3>
                    <p className="text-slate-700 dark:text-slate-300 text-base">Sealed, pressure-controlled, and filter-locked environments that bots cannot survive exiting.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Environmental Containment</h3>
                    <p className="text-slate-700 dark:text-slate-300 text-base">Bots require synthetic materials or energy sources only available inside lab settings.</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Chemical/Biological Failsafes</h3>
                    <p className="text-slate-700 dark:text-slate-300 text-base">Presence of natural biomolecules (e.g., skin oils, CO₂) triggers programmed self-destruction.</p>
                  </div>
                </div>

                <p className="mt-4 mb-0 font-medium">No system should rely on a single point of failure.</p>
              </div>

              {/* Principle 3 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white m-0">Proven Kill Switches Before Deployment</h2>
                </div>
                <p className="mt-0 mb-4">No nanobot or swarm enters physical operation without:</p>
                <ul className="pl-6 list-disc space-y-2">
                  <li>At least two independent, proven self-destruction pathways.</li>
                  <li>Environmental sensitivity kill-triggers (light, magnetic fields, chemical absence).</li>
                  <li>External manual kill-switches (human overrides that function even if systems fail).</li>
                </ul>
              </div>

              {/* Principle 4 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white m-0">Simulation-First, Hardware-Last</h2>
                </div>
                <p className="mt-0 mb-4">Before a single physical nanobot is constructed:</p>
                <ul className="pl-6 list-disc space-y-2">
                  <li>Full virtual population-scale simulations must be run.</li>
                  <li>Stress-tests against environmental drift, error propagation, resource hijacking, and emergent behavior must pass aggressive thresholds.</li>
                  <li>Grey goo risk modeling must be a standard practice.</li>
                </ul>
              </div>

              {/* Principle 5 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">5</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white m-0">Restricted Replication Parameters</h2>
                </div>
                <p className="mt-0 mb-4">All replication-enabled systems must be designed with:</p>
                <ul className="pl-6 list-disc space-y-2">
                  <li>Hard replication limits (number of copies, lifespan, material usage quotas).</li>
                  <li>Geofenced operational boundaries (bots refuse to replicate outside authorized zones).</li>
                  <li>Decay protocols — bots age and degrade naturally after their mission is complete.</li>
                </ul>
                <p className="mt-4 mb-0 font-medium">No open-ended replication is permitted without triple redundancy kill switches.</p>
              </div>

              {/* Principle 6 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">6</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white m-0">Real-Time Population and Behavior Monitoring</h2>
                </div>
                <p className="mt-0 mb-4">Constant nanoscale monitoring must be active during all operations:</p>
                <ul className="pl-6 list-disc space-y-2">
                  <li>Live particle tracking.</li>
                  <li>Real-time chemical emission monitoring.</li>
                  <li>Thermal anomaly detection (early warning for energy-intensive replication surges).</li>
                </ul>
                <p className="mt-4 mb-0">AI-assisted early warning systems must flag deviation patterns within minutes.</p>
              </div>

              {/* Principle 7 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">7</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white m-0">External Ethical and Safety Governance</h2>
                </div>
                <p className="mt-0 mb-4">All self-replicating nanosystem projects must be reviewed and certified by an independent ethics and safety board before activation.</p>
                <ul className="pl-6 list-disc space-y-2">
                  <li>Clear "kill criteria" must be established in advance.</li>
                  <li>Emergency shutdown rights must be external to the project leadership chain.</li>
                  <li>Safety audits must occur every operational cycle.</li>
                </ul>
              </div>

              {/* Principle 8 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/50 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">8</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white m-0">Slow Capability Rollouts</h2>
                </div>
                <p className="mt-0 mb-4">New features (e.g., enhanced replication rates, adaptive behaviors, environmental interaction) must:</p>
                <ul className="pl-6 list-disc space-y-2">
                  <li>Be introduced incrementally, in staged, supervised deployments.</li>
                  <li>Be validated at each stage before proceeding.</li>
                  <li>Never bypass containment unless proven safe under stress and attack conditions.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-8 rounded-xl mt-16 mb-12 border border-blue-100 dark:border-blue-900/30 shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Conclusion</h3>
              <p className="text-slate-700 dark:text-slate-300 text-lg">
                The true potential of nanotechnology lies not only in its power to build, but in our wisdom to control it.
                Safety is not a limitation — it is the foundation for trusted, world-changing innovation.
              </p>
            </div>

            <hr className="my-12 border-slate-200 dark:border-slate-700" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  First published: May 2023
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                  Share
                </button>
                <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 