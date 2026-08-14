const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  tr: () => import('./tr.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: string) => {
  if (locale in dictionaries) {
    return dictionaries[locale as Locale]();
  }
  return dictionaries.en();
};
