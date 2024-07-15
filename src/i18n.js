// src/i18n.js
// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "settings": "Settings",
      "changePassword": "Change Password",
      "yourSubscriptions": "Your Subscriptions",
      "changeLanguage": "Change Language",
      "changeTheme": "Change Theme",
      "termsConditions": "Terms & Conditions",
      "cobons": "Cobons",
      "helpCenter": "Help Center",
      "whatWeCanPost": "What we can post?",
      "aboutUs": "About Us",
      "deleteAccount": "Delete Account",
      "logout": "Logout",
      "languageChanged": "Language changed to English"
    }
  },
  ar: {
    translation: {
      "settings": "الإعدادات",
      "changePassword": "تغيير كلمة المرور",
      "yourSubscriptions": "اشتراكاتك",
      "changeLanguage": "تغيير اللغة",
      "changeTheme": "تغيير الثيم",
      "termsConditions": "الشروط والأحكام",
      "cobons": "كوبونات",
      "helpCenter": "مركز المساعدة",
      "whatWeCanPost": "ما يمكننا نشره؟",
      "aboutUs": "معلومات عنا",
      "deleteAccount": "حذف الحساب",
      "logout": "تسجيل الخروج",
      "languageChanged": "تم تغيير اللغة إلى العربية"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // اللغة الافتراضية
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
