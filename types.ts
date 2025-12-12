export enum PinType {
  PROJECT = 'PROJECT',
  EXPERIENCE = 'EXPERIENCE',
  SKILL = 'SKILL',
  ACHIEVEMENT = 'ACHIEVEMENT',
  RESUME = 'RESUME',
  BLOG = 'BLOG',
  STICKER = 'STICKER'
}

export interface PinData {
  id: string;
  type: PinType;
  title: string;
  description: string;
  imageUrl?: string;
  tags?: string[];
  link?: string;
  color?: string; // Tailwind color class for background
  size?: 'small' | 'medium' | 'large'; // For grid sizing
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface StickerData {
  id: string;
  emoji: string;
  top: string;
  left: string;
  rotation: number;
}
