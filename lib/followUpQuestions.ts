// Comprehension question shown right after each scene's SALITA puzzle —
// content not yet supplied by the client. A scene with no entry here
// simply skips this step (auto-advances straight on), so the rest of
// the flow works today and this activates the moment content arrives.
export type FollowUpQuestion = {
  scene: number;
  question: string;
  choices: string[];
  correctIndex: number;
};

export const followUpQuestions: FollowUpQuestion[] = [];

export function followUpFor(scene: number): FollowUpQuestion | undefined {
  return followUpQuestions.find((q) => q.scene === scene);
}
