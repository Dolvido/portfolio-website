import SiteLink from './SiteLink';
import { profile } from '../data/portfolio';
export default function Footer() { return <footer className="site-footer portfolio-content"><div className="container"><span>Luke Payne / Software, experiments, unfinished questions.</span><div className="footer-links"><SiteLink href="/contact/">Get in touch</SiteLink><SiteLink href="/resume/">Resume</SiteLink><SiteLink href={profile.github}>GitHub</SiteLink><SiteLink href={profile.linkedin}>LinkedIn</SiteLink></div></div></footer>; }
