export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  createdAt?: string;
}
