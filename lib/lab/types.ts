export const publicationTypes = [
  "Lab Report",
  "Experiment",
  "Project Log",
  "Engineering Note",
  "Field Note",
  "Idea",
] as const;

export const outcomeClassifications = [
  "supported",
  "not-supported",
  "inconclusive",
  "ongoing",
  "not-applicable",
] as const;

export const outcomeClassificationLabels = {
  supported: "Supported",
  "not-supported": "Not supported",
  inconclusive: "Inconclusive",
  ongoing: "Ongoing",
  "not-applicable": "Not applicable",
} as const;

export const provenanceOrigins = ["human-authored", "historical-migration", "reviewed-candidate"] as const;

export const provenanceOriginLabels = {
  "human-authored": "Human-authored",
  "historical-migration": "Historical migration",
  "reviewed-candidate": "Reviewed candidate",
} as const;

export type PublicationType = (typeof publicationTypes)[number];
export type PublicationStatus = "draft" | "published";
export type ReviewStatus = "pending" | "approved";
export type OutcomeClassification = (typeof outcomeClassifications)[number];
export type ProvenanceOrigin = (typeof provenanceOrigins)[number];

export type PublicationProject = {
  id?: string;
  name: string;
  href?: string;
};

export type PublicReference = {
  id: string;
  label: string;
  href: string;
  kind?: string;
  note?: string;
};

export type PublicationOutcome = {
  classification: OutcomeClassification;
  summary: string;
};

export type PublicationProvenance = {
  origin: ProvenanceOrigin;
  summary: string;
  generatedAt?: string;
  sourceRevision?: string;
  publicReferences?: PublicReference[];
};

export type PublicationMetadata = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  type: PublicationType;
  project?: PublicationProject;
  tags?: string[];
  outcome: PublicationOutcome;
  status: PublicationStatus;
  reviewStatus: ReviewStatus;
  evidence?: PublicReference[];
};

export type PublicationBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; code: string; language?: string; caption?: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      width?: number;
      height?: number;
    }
  | { type: "keyValue"; items: Array<{ label: string; value: string }> }
  | { type: "numbered"; items: Array<{ title: string; body: string[] }> }
  | { type: "callout"; text: string; label?: string }
  | { type: "links"; items: Array<{ label: string; href: string; note?: string }> };

export type PublicationSection = {
  title: string;
  blocks: PublicationBlock[];
};

export type LabPublication = {
  schemaVersion: 1;
  metadata: PublicationMetadata;
  provenance: PublicationProvenance;
  quote?: string;
  sections: PublicationSection[];
};

export type PublicationSummary = Omit<PublicationMetadata, "date"> & {
  date?: string;
  href: string;
  source: "lab-artifact" | "idea-archive";
};

export type LabStatusField = {
  label: string;
  detail: string;
};

export type ActiveLabProject = {
  id: string;
  name: string;
  status: string;
};

export type LabConfig = {
  identifier: string;
  name: string;
  description: string;
  operatingPrinciple: string;
  status: LabStatusField;
  governance: LabStatusField;
  activeProjects: ActiveLabProject[];
  lastUpdated: string;
};
