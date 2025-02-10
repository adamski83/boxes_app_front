import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { formTranslations } from "src/components/form/formTranslations";
import { sidebarTranslations } from "src/components/sidebar/sidebarTranslations";

const resources = {
  en: {
    translation: {
      sidebar: sidebarTranslations.en,
      form: formTranslations.en,
    },
  },
  pl: {
    translation: {
      sidebar: sidebarTranslations.pl,
      form: formTranslations.pl,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pl",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
