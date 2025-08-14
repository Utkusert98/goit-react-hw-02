import { useState, useEffect } from "react";
import Section from "./components/Section/Section";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

function App() {
  const [feedback, setFeedback] = useState(() => {
    const stored = localStorage.getItem("feedback-data");
    return stored ? JSON.parse(stored) : { good: 0, neutral: 0, bad: 0 };
  });

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positivePercentage = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  useEffect(() => {
    localStorage.setItem("feedback-data", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (type) => {
    setFeedback((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  return (
    <div>
      <Section title="Sip Happens Café">
        <p>Please leave your feedback about our service by selecting one of the options below.</p>
        <Options
          onFeedback={updateFeedback}
          total={totalFeedback}
          onReset={resetFeedback}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Feedback feedback={feedback} total={totalFeedback} positive={positivePercentage} />
        ) : (
          <Notification message="There is no feedback yet." />
        )}
      </Section>
    </div>
  );
}

export default App;

