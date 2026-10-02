import DraftArticleLink from "./components/DraftArticleLink";
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import SiteLink from './components/SiteLink';
import { StudioIntro, FlagshipWork, SupportingWork, WorkingNotes } from './components/StudioSections';
import { getHomepageLabPublications } from '../lib/lab/publications';
export default function Home() { const writing = getHomepageLabPublications(2); return <div className="portfolio-shell"><Navigation /><main id="main-content" className="portfolio-content container"><StudioIntro /><FlagshipWork /><SupportingWork /><WorkingNotes /><section className="writing-preview"><h2>Notes from the work.</h2><DraftArticleLink />{writing.map(p => <SiteLink key={p.slug} href={'/lab/' + p.slug + '/'}>{p.title} →</SiteLink>)}<SiteLink href="/lab/">All writing →</SiteLink></section></main><Footer /></div>; }
