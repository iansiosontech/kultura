import { Suspense } from "react";
import QuizContent from "@/components/QuizContent";

export default function QuizPage() {
  return (
    <Suspense fallback={null}>
      <QuizContent />
    </Suspense>
  );
}
