import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { formTranslations } from "src/components/form/formTranslations";
import { sidebarTranslations } from "src/components/sidebar/sidebarTranslations";

import { translate } from "src/components/searchBar/SearchBar";
import { loginTranslations } from "src/components/login/loginTranslation";
import { ordersTranslations } from "src/orders/ordersTranslations";

const resources = {
  en: {
    translation: {
      sidebar: sidebarTranslations.en,
      form: formTranslations.en,
      translate: translate.en,
      login: loginTranslations.en,
      orders: ordersTranslations.en,
    },
  },
  pl: {
    translation: {
      sidebar: sidebarTranslations.pl,
      form: formTranslations.pl,
      translate: translate.pl,
      login: loginTranslations.pl,
      orders: ordersTranslations.pl,
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
