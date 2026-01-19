import { useEffect, useState } from "react";
import { translateText } from "../services/translationService";

export default function useTranslatedText(originalText) {
  const [translatedText, setTranslatedText] = useState(originalText);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  // Watch for language changes (same tab)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentLang = localStorage.getItem("language") || "en";
      setLanguage((prev) => (prev !== currentLang ? currentLang : prev));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Translate text when language changes
  useEffect(() => {
    if (language !== "en") {
      translateText(originalText, "en", language)
        .then((translated) => {
          if (!translated || translated.trim() === originalText.trim()) {
            setTranslatedText(originalText);
        } else {
            setTranslatedText(translated);
        }
        })
        .catch(() => {
          setTranslatedText(originalText);
        });
    } else {
      setTranslatedText(originalText);
    }
  }, [language, originalText]);

  return translatedText;
}
