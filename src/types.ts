/* ============================================
   Shared Types — Antigravity Courses
   ============================================ */

export interface CourseSection {
  id: string;
  title: string;
  /** HTML content including <pre><code> blocks for code examples */
  content: string;
  tip?: string;
  warning?: string;
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
  sections: CourseSection[];
  keyTakeaways: string[];
}

export type RouteHandler = (params?: Record<string, string>) => void;
