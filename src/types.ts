/* ============================================
   Shared Types — Antigravity Courses
   ============================================ */

export interface CourseSection {
  id: string;
  title: string;
  /** HTML content for technical mode */
  content: string;
  /** HTML content for simple/non-technical mode */
  simpleContent?: string;
  /** "Try it yourself" exercise HTML */
  exercise?: string;
  tip?: string;
  warning?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  /** 0-based index of correct answer */
  correctIndex: number;
  explanation: string;
}

export interface CourseMeta {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
  link: string;
}

export interface CourseContent {
  id: number;
  objectives: string[];
  prerequisites?: string[];
  estimatedTime: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto';
  /** One-paragraph summary in everyday language for non-technical readers */
  simpleSummary: string;
  sections: CourseSection[];
  /** 3-4 quiz questions to validate comprehension */
  quiz: QuizQuestion[];
  keyTakeaways: string[];
}

export type RouteHandler = (params?: Record<string, string>) => void;
