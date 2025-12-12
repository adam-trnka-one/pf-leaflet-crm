import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProductFruits } from '@/hooks/useProductFruits';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const { initializeProductFruits } = useProductFruits();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
    
    // Reinitialize ProductFruits with the new language
    initializeProductFruits();
  };

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px] h-9">
        <SelectValue>
          <span className="flex items-center gap-2">
            <span>{currentLang.flag}</span>
            <span>{currentLang.name}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
