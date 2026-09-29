export type Subject = "数学" | "英语";

export type ResourceType = "video" | "article" | "course" | "audio" | "clip";

export type ResourceAvailability = "available" | "unavailable";

export type Resource = {
  id: string;
  title: string;
  type: ResourceType;
  url: string | null;
  source: string;
  knowledgePoint: string;
  difficulty: "入门" | "基础" | "进阶";
  description: string;
  availability: ResourceAvailability;
  relatedNextStep: string | null;
};

export type MathQuestionType = "numeric" | "choice" | "fill" | "text";

export type MathQuestion = {
  id: string;
  question: string;
  type: MathQuestionType;
  knowledgePoint: string;
  difficulty: "入门" | "基础" | "进阶";
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  typeExplanation: string;
};

export type VocabularyWord = {
  id: string;
  word: string;
  ipa: string;
  partOfSpeech: string;
  meaning: string;
  englishDefinition?: string;
  example: string;
  exampleTranslation: string;
  collocations: string[];
  memoryVideo?: Resource;
};

export type VocabularyTestType = "en-to-zh" | "zh-to-en" | "listen-to-spell" | "recall";

export type VocabularyTestRecord = {
  wordId: string;
  testType: VocabularyTestType;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timestamp: string;
  sessionDate: string;
};

export type DailyVocabularySession = {
  date: string;
  wordIds: string[];
  queue: string[];
  seenWordIds: string[];
  testedWordIds: string[];
  masteredWordIds: string[];
  attempts: number;
};

export type KnowledgePoint = {
  id: string;
  title: string;
  summary: string;
  content: string[];
  whyLearn: string;
  learningGoals: string[];
  prerequisites: string[];
  nextKnowledgePointId: string | null;
  resources: Resource[];
  exercises: MathQuestion[];
};

export type FilmEnglishItem = {
  id: string;
  work: string;
  clipTitle: string;
  clipDescription: string;
  learningGoal: string;
  vocabulary: string[];
  tasks: string[];
  resource: Resource;
};

export type LearningRecord = {
  id: string;
  subject: Subject;
  title: string;
  action: string;
  createdAt: string;
};

export type AppProgress = {
  completedKnowledgePoints: string[];
  exerciseResults: Record<string, boolean>;
  currentKnowledgePointId: string;
  records: LearningRecord[];
  vocabularyMastered: string[];
  vocabularyTestRecords: VocabularyTestRecord[];
  dailyVocabularySession: DailyVocabularySession | null;
};
