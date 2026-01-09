import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      'nav.dashboard': 'Dashboard',
      'nav.credentials': 'Credentials',
      'nav.verify': 'Verify',
      'nav.analytics': 'Analytics',
      'nav.settings': 'Settings',
      'nav.logout': 'Logout',
      
      // Auth
      'auth.login': 'Login',
      'auth.signup': 'Sign Up',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.name': 'Full Name',
      'auth.aadhaar': 'Aadhaar Number',
      'auth.learner': 'Learner',
      'auth.employer': 'Employer',
      'auth.loginAs': 'Login as',
      
      // Dashboard
      'dashboard.welcome': 'Welcome back',
      'dashboard.employabilityScore': 'Employability Score',
      'dashboard.totalCredentials': 'Total Credentials',
      'dashboard.verified': 'Verified',
      'dashboard.employerViews': 'Employer Views',
      'dashboard.recentCredentials': 'Recent Credentials',
      'dashboard.nsqfDistribution': 'NSQF Level Distribution',
      'dashboard.profileCompleteness': 'Profile Completeness',
      
      // Credentials
      'credentials.add': 'Add Credential',
      'credentials.import': 'Import from DigiLocker',
      'credentials.upload': 'Upload Certificate',
      'credentials.name': 'Credential Name',
      'credentials.issuer': 'Issuer',
      'credentials.issueDate': 'Issue Date',
      'credentials.nsqfLevel': 'NSQF Level',
      'credentials.skills': 'Skills',
      'credentials.status': 'Status',
      
      // Common
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.view': 'View',
      'common.share': 'Share',
      'common.verify': 'Verify',
      'common.download': 'Download',
      'common.search': 'Search',
      
      // Verification
      'verify.scanQR': 'Scan QR Code',
      'verify.enterID': 'Enter Credential ID',
      'verify.result': 'Verification Result',
      'verify.authentic': 'Authentic Credential',
      'verify.invalid': 'Invalid Credential',
      
      // Profile
      'profile.shareableLink': 'Shareable Profile Link',
      'profile.generateQR': 'Generate QR Code',
      'profile.employabilityScore': 'Your Employability Score',
    }
  },
  hi: {
    translation: {
      // Navigation
      'nav.dashboard': 'डैशबोर्ड',
      'nav.credentials': 'प्रमाण पत्र',
      'nav.verify': 'सत्यापित करें',
      'nav.analytics': 'विश्लेषण',
      'nav.settings': 'सेटिंग्स',
      'nav.logout': 'लॉग आउट',
      
      // Auth
      'auth.login': 'लॉगिन',
      'auth.signup': 'साइन अप',
      'auth.email': 'ईमेल',
      'auth.password': 'पासवर्ड',
      'auth.name': 'पूरा नाम',
      'auth.aadhaar': 'आधार नंबर',
      'auth.learner': 'शिक्षार्थी',
      'auth.employer': 'नियोक्ता',
      'auth.loginAs': 'लॉगिन करें',
      
      // Dashboard
      'dashboard.welcome': 'स्वागत है',
      'dashboard.employabilityScore': 'रोजगार योग्यता स्कोर',
      'dashboard.totalCredentials': 'कुल प्रमाण पत्र',
      'dashboard.verified': 'सत्यापित',
      'dashboard.employerViews': 'नियोक्ता दृश्य',
      'dashboard.recentCredentials': 'हाल के प्रमाण पत्र',
      'dashboard.nsqfDistribution': 'NSQF स्तर वितरण',
      'dashboard.profileCompleteness': 'प्रोफ़ाइल पूर्णता',
      
      // Credentials
      'credentials.add': 'प्रमाण पत्र जोड़ें',
      'credentials.import': 'डिजीलॉकर से आयात करें',
      'credentials.upload': 'प्रमाण पत्र अपलोड करें',
      'credentials.name': 'प्रमाण पत्र का नाम',
      'credentials.issuer': 'जारीकर्ता',
      'credentials.issueDate': 'जारी करने की तिथि',
      'credentials.nsqfLevel': 'NSQF स्तर',
      'credentials.skills': 'कौशल',
      'credentials.status': 'स्थिति',
      
      // Common
      'common.save': 'सहेजें',
      'common.cancel': 'रद्द करें',
      'common.delete': 'हटाएं',
      'common.edit': 'संपादित करें',
      'common.view': 'देखें',
      'common.share': 'साझा करें',
      'common.verify': 'सत्यापित करें',
      'common.download': 'डाउनलोड करें',
      'common.search': 'खोजें',
      
      // Verification
      'verify.scanQR': 'QR कोड स्कैन करें',
      'verify.enterID': 'प्रमाण पत्र ID दर्ज करें',
      'verify.result': 'सत्यापन परिणाम',
      'verify.authentic': 'प्रामाणिक प्रमाण पत्र',
      'verify.invalid': 'अमान्य प्रमाण पत्र',
      
      // Profile
      'profile.shareableLink': 'साझा करने योग्य प्रोफ़ाइल लिंक',
      'profile.generateQR': 'QR कोड उत्पन्न करें',
      'profile.employabilityScore': 'आपका रोजगार योग्यता स्कोर',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
