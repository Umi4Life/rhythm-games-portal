export interface Config {
  authorName: string;
  githubLink: string;
}

export interface Game {
  id: string;
  title: string;
  logo: string;
  url: string;
  region?: string;
  tags?: string[];
  groupName?: string;
}

export interface Group {
  groupName: string;
  games: Game[];
}

export interface Particle {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: string;
}