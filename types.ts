export interface Post {
  id: string;
  content: string;
  timestamp: number;
  mood?: string;
  emoji?: string;
}

export interface MoodResponse {
  mood: string;
  emoji: string;
}
