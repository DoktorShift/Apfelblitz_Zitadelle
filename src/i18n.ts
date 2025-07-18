import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    common: {
      // Network Stats
      "liveNetworkStatus": "LIVE_NETWORK_STATUS",
      "txCount": "TX_COUNT",
      "totalProcessed": "TOTAL_PROCESSED",
      "lastPayment": "LAST_PAYMENT",
      "totalBalance": "TOTAL_BALANCE",
      "walletBalances": "WALLET_BALANCES",
      "recentTransactions": "RECENT_TRANSACTIONS",
      "waitingForTransactions": "WAITING_FOR_TRANSACTIONS...",
      "connectionError": "CONNECTION_ERROR",
      "retryConnection": "RETRY_CONNECTION",
      "live": "LIVE",
      "lastSync": "LAST_SYNC",
      "noPaymentsYet": "NO_PAYMENTS_YET",
      "wallet": "WALLET",
      "wallets": "WALLETS",
      
      // Apple Choice
      "theChoiceIsYours": "THE CHOICE IS YOURS",
      "choiceDescription": "Both paths lead to enlightenment. Both apples are perfect. The real choice isn't which one to take... but how much value you give.",
      "redApple": "RED_APPLE",
      "passionPath": "PASSION_PATH",
      "redQuote": "Sweet, crisp, and awakening - a taste of pure energy",
      "enhancesFocus": "ENHANCES_FOCUS",
      "greenApple": "GREEN_APPLE",
      "wisdomPath": "WISDOM_PATH",
      "greenQuote": "Tart, refreshing, and enlightening - nature's perfect balance",
      "amplifiesClarity": "AMPLIFIES_CLARITY",
      "chooseApple": "CHOOSE_APPLE",
      "effect": "EFFECT",
      
      // Payment Modal
      "lightningPayment": "LIGHTNING_PAYMENT",
      "payWhatYouWant": "Pay What You Want",
      "scanOrTapQr": "SCAN_OR_TAP_QR",
      "openWallet": "OPEN_WALLET",
      "copyLnurl": "COPY_LNURL",
      "tapToCopy": "TAP_TO_COPY",
      "generating": "GENERATING...",
      "qrFailed": "QR_FAILED",
      "retry": "RETRY",
      "supportDrShift": "20% support to DrShift.dev",
      "lightningDev": "Lightning & Nostr development",
      "pwrdByAurora": "pwrd by Aurora",
      "securePayment": "Secure Lightning Network Payment",
      
      // Wallet Balance
      "walletBalance": "WALLET_BALANCE",
      "lightning": "LIGHTNING",
      "sync": "SYNC...",
      
      // Transaction components
      "liveTransactions": "Live Transaktionen",
      "waitingForFirst": "Warte auf erste Lightning-Zahlung...",
      "justNow": "Gerade eben",
      "minAgo": "Min",
      "today": "Heute",
      "yesterday": "Gestern",
      "thisWeek": "Diese Woche",
      "thisMonth": "Diesen Monat",
      "before": "vor",
      "page": "Seite",
      "of": "von",
      "back": "Zurück",
      "next": "Weiter",
      "counterNotAvailable": "Counter nicht verfügbar",
      "backendConnectionFailed": "Backend-Verbindung fehlgeschlagen",
      "activeTransactions": "Aktive Transaktionen",
      "autoRefresh": "Auto-refresh every 30s • Last update",
      
      // Philosophical section
      "soundMoneySoundChoices": "SOUND MONEY, SOUND CHOICES",
      "infinitePossibilities": "In a world of infinite possibilities, you chose to be here. You chose to pay with Bitcoin. You chose to support value-for-value.",
      "realChoice": "The real choice was never about the apples...",
      "aboutSoundMoney": "It was about choosing sound money.",
      "organicApples": "🍎 ORGANIC APPLES",
      "lightningNetwork": "⚡ LIGHTNING NETWORK",
      "soundMoney": "₿ SOUND MONEY",
      "valueForValue": "🌟 VALUE FOR VALUE",
      
      // Language switcher
      "changeReality": "CHANGE_REALITY",
      "selectLanguage": "SELECT_LANGUAGE",
      "english": "ENGLISH",
      "german": "DEUTSCH"
    }
  },
  de: {
    common: {
      // Network Stats
      "liveNetworkStatus": "LIVE_NETZWERK_STATUS",
      "txCount": "TX_ANZAHL",
      "totalProcessed": "GESAMT_VERARBEITET",
      "lastPayment": "LETZTE_ZAHLUNG",
      "totalBalance": "GESAMT_GUTHABEN",
      "walletBalances": "WALLET_GUTHABEN",
      "recentTransactions": "AKTUELLE_TRANSAKTIONEN",
      "waitingForTransactions": "WARTE_AUF_TRANSAKTIONEN...",
      "connectionError": "VERBINDUNGS_FEHLER",
      "retryConnection": "VERBINDUNG_WIEDERHOLEN",
      "live": "LIVE",
      "lastSync": "LETZTE_SYNC",
      "noPaymentsYet": "NOCH_KEINE_ZAHLUNGEN",
      "wallet": "WALLET",
      "wallets": "WALLETS",
      
      // Apple Choice
      "theChoiceIsYours": "DIE WAHL LIEGT BEI DIR",
      "choiceDescription": "Beide Wege führen zur Erleuchtung. Beide Äpfel sind perfekt. Die wahre Wahl ist nicht, welchen du nimmst... sondern wie viel Wert du gibst.",
      "redApple": "ROTER_APFEL",
      "passionPath": "LEIDENSCHAFTS_WEG",
      "redQuote": "Süß, knackig und erweckend - ein Geschmack purer Energie",
      "enhancesFocus": "VERSTÄRKT_FOKUS",
      "greenApple": "GRÜNER_APFEL",
      "wisdomPath": "WEISHEITS_WEG",
      "greenQuote": "Herb, erfrischend und erleuchtend - die perfekte Balance der Natur",
      "amplifiesClarity": "VERSTÄRKT_KLARHEIT",
      "chooseApple": "APFEL_WÄHLEN",
      "effect": "EFFEKT",
      
      // Payment Modal
      "lightningPayment": "LIGHTNING_ZAHLUNG",
      "payWhatYouWant": "Zahle was du willst",
      "scanOrTapQr": "QR_SCANNEN_ODER_TIPPEN",
      "openWallet": "WALLET_ÖFFNEN",
      "copyLnurl": "LNURL_KOPIEREN",
      "tapToCopy": "TIPPEN_ZUM_KOPIEREN",
      "generating": "GENERIERE...",
      "qrFailed": "QR_FEHLER",
      "retry": "WIEDERHOLEN",
      "supportDrShift": "20% Unterstützung für DrShift.dev",
      "lightningDev": "Lightning & Nostr Entwicklung",
      "pwrdByAurora": "unterstützt von Aurora",
      "securePayment": "Sichere Lightning Network Zahlung",
      
      // Wallet Balance
      "walletBalance": "WALLET_GUTHABEN",
      "lightning": "LIGHTNING",
      "sync": "SYNC...",
      
      // Transaction components
      "liveTransactions": "Live Transaktionen",
      "waitingForFirst": "Warte auf erste Lightning-Zahlung...",
      "justNow": "Gerade eben",
      "minAgo": "Min",
      "today": "Heute",
      "yesterday": "Gestern",
      "thisWeek": "Diese Woche",
      "thisMonth": "Diesen Monat",
      "before": "vor",
      "page": "Seite",
      "of": "von",
      "back": "Zurück",
      "next": "Weiter",
      "counterNotAvailable": "Zähler nicht verfügbar",
      "backendConnectionFailed": "Backend-Verbindung fehlgeschlagen",
      "activeTransactions": "Aktive Transaktionen",
      "autoRefresh": "Auto-Aktualisierung alle 30s • Letzte Aktualisierung",
      
      // Philosophical section
      "soundMoneySoundChoices": "SOLIDES GELD, SOLIDE ENTSCHEIDUNGEN",
      "infinitePossibilities": "In einer Welt unendlicher Möglichkeiten hast du dich entschieden, hier zu sein. Du hast dich entschieden, mit Bitcoin zu zahlen. Du hast dich für Value-for-Value entschieden.",
      "realChoice": "Die wahre Wahl ging nie um die Äpfel...",
      "aboutSoundMoney": "Es ging darum, solides Geld zu wählen.",
      "organicApples": "🍎 BIO ÄPFEL",
      "lightningNetwork": "⚡ LIGHTNING NETWORK",
      "soundMoney": "₿ SOLIDES GELD",
      "valueForValue": "🌟 VALUE FOR VALUE",
      
      // Language switcher
      "changeReality": "REALITÄT_ÄNDERN",
      "selectLanguage": "SPRACHE_WÄHLEN",
      "english": "ENGLISCH",
      "german": "DEUTSCH"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    // Store language preference in localStorage
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;