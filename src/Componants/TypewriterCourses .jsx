import  { useState, useEffect } from 'react';

const TypewriterCourses = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const courses = [
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Mobile App Development",
    "Cloud Computing",
    "Cyber Security",
    "Blockchain",
    "UI/UX Design"
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 150;
    const currentCourse = courses[currentCourseIndex];

    if (!isDeleting && displayText.length === currentCourse.length) {
      // Pause at full text
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && displayText.length === 0) {
      // Move to next course after deleting
      setIsDeleting(false);
      setCurrentCourseIndex((prevIndex) => (prevIndex + 1) % courses.length);
      setCurrentIndex(0);
    } else {
      const timeout = setTimeout(() => {
        if (isDeleting) {
          setDisplayText(currentCourse.substring(0, displayText.length - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setDisplayText(currentCourse.substring(0, displayText.length + 1));
          setCurrentIndex(currentIndex + 1);
        }
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [displayText, currentIndex, isDeleting, currentCourseIndex]);

  return (
    <span className="typewriter-text">
      {displayText}
      <span className="cursor">|</span>
    </span>
  );
};

export default TypewriterCourses;