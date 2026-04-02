export type Lang = "en" | "ja";

export const LANG_STORAGE_KEY = "memoria-lang";

export function getLang(): Lang {
  if (typeof window === "undefined") return "en";
  return (localStorage.getItem(LANG_STORAGE_KEY) as Lang) || "en";
}

export function persistLang(lang: Lang): void {
  localStorage.setItem(LANG_STORAGE_KEY, lang);
}

export interface T {
  auth: {
    title: string;
    subtitle: string;
    whyGoogle: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    continueWithGoogle: string;
  };
  nav: {
    home: string;
    list: string;
    add: string;
    settings: string;
  };
  titles: {
    home: string;
    list: string;
    detail: string;
    addAnniversary: string;
    editAnniversary: string;
    settings: string;
    welcome: string;
  };
  home: {
    nextAnniversary: string;
    daysLeft: string;
    milestone: string;
    noAnniversaries: string;
    saved: string;
    events: string;
    synced: string;
    calendar: string;
    in: string;
    days: string;
    upcoming: string;
    viewAll: string;
  };
  list: {
    search: string;
    all: string;
    daysLeft: string;
  };
  detail: {
    elapsed: string;
    nextEvent: string;
    daysLeft: string;
    yearProgress: string;
    nextMilestone: string;
    inDays: string;
    days: string;
    totalDays: string;
    noMemo: string;
    weekAlert: string;
    weekAlertDesc: string;
    googleCalendar: string;
    googleCalendarDesc: string;
    milestone: string;
    edit: string;
    delete: string;
  };
  form: {
    emoji: string;
    date: string;
    nameEn: string;
    nameJa: string;
    category: string;
    newCategory: string;
    repeatYearly: string;
    repeatYearlyDesc: string;
    weekAlert: string;
    weekAlertDesc: string;
    milestoneAlert: string;
    milestoneAlertDesc: string;
    googleCalendar: string;
    googleCalendarDesc: string;
    memo: string;
    memoPlaceholder: string;
    addAnniversary: string;
    updateAnniversary: string;
    namePlaceholderEn: string;
    namePlaceholderJa: string;
  };
  settings: {
    account: string;
    signedIn: string;
    language: string;
    categories: string;
    defaultNotification: string;
    defaultNotificationDesc: string;
    milestoneNotification: string;
    milestoneNotificationDesc: string;
    googleCalendar: string;
    connected: string;
    quickActions: string;
    goToHome: string;
    resetData: string;
    signOut: string;
  };
  share: {
    shareTitle: string;
    shareSubtitle: string;
    systemShare: string;
    generatePng: string;
    saveTemplate: string;
    previewCaption: string;
    copyLink: string;
  };
}

export const translations: Record<Lang, T> = {
  en: {
    auth: {
      title: "Welcome to Memoria",
      subtitle:
        "Sign in with your Google account to save anniversaries, sync Google Calendar, and keep reminders across devices.",
      whyGoogle: "Why Google sign-in?",
      benefit1: "Quick account creation with one tap",
      benefit2: "Secure sign-in without a separate password",
      benefit3: "Easy Google Calendar connection",
      continueWithGoogle: "Continue with Google",
    },
    nav: {
      home: "Home",
      list: "List",
      add: "Add",
      settings: "Settings",
    },
    titles: {
      home: "Home",
      list: "All Anniversaries",
      detail: "Detail",
      addAnniversary: "Add Anniversary",
      editAnniversary: "Edit Anniversary",
      settings: "Settings",
      welcome: "Welcome",
    },
    home: {
      nextAnniversary: "Next anniversary",
      daysLeft: "days",
      milestone: "Milestone",
      noAnniversaries: "No anniversaries yet. Add your first one.",
      saved: "Saved",
      events: "events",
      synced: "Synced",
      calendar: "calendar",
      in: "in",
      days: "days",
      upcoming: "Upcoming",
      viewAll: "View all",
    },
    list: {
      search: "Search anniversaries",
      all: "All",
      daysLeft: "d",
    },
    detail: {
      elapsed: "Elapsed",
      nextEvent: "Next event",
      daysLeft: "days left",
      yearProgress: "Year progress",
      nextMilestone: "Next milestone",
      inDays: "in",
      days: "days",
      totalDays: "Total days passed",
      noMemo: "No memo yet.",
      weekAlert: "1 week alert",
      weekAlertDesc: "Push notification enabled",
      googleCalendar: "Google Calendar sync",
      googleCalendarDesc: "Recurring yearly event",
      milestone: "milestone",
      edit: "Edit",
      delete: "Delete",
    },
    form: {
      emoji: "Emoji",
      date: "Date",
      nameEn: "Name (English)",
      nameJa: "Name (Japanese)",
      category: "Category",
      newCategory: "New category",
      repeatYearly: "Repeat yearly",
      repeatYearlyDesc: "For birthdays and anniversaries",
      weekAlert: "1 week alert",
      weekAlertDesc: "Send a reminder before the day",
      milestoneAlert: "Milestone alert",
      milestoneAlertDesc: "Notify for 1000/2000/3000 days",
      googleCalendar: "Google Calendar sync",
      googleCalendarDesc: "Create calendar event automatically",
      memo: "Memo",
      memoPlaceholder: "Gift ideas, notes, or plans...",
      addAnniversary: "Add Anniversary",
      updateAnniversary: "Update Anniversary",
      namePlaceholderEn: "Mom's Birthday",
      namePlaceholderJa: "母の誕生日",
    },
    settings: {
      account: "Account",
      signedIn: "Signed in with Google",
      language: "Language",
      categories: "Categories",
      defaultNotification: "Default notification",
      defaultNotificationDesc: "1 week before each event",
      milestoneNotification: "Milestone notification",
      milestoneNotificationDesc: "3 days before 1000, 2000, 3000 days",
      googleCalendar: "Google Calendar",
      connected: "Connected",
      quickActions: "Quick actions",
      goToHome: "Go to Home",
      resetData: "Delete all data",
      signOut: "Sign out",
    },
    share: {
      shareTitle: "Share this anniversary",
      shareSubtitle: "Celebrate or remind others on social apps.",
      systemShare: "System Share",
      generatePng: "Generate PNG",
      saveTemplate: "Save Template",
      previewCaption: "Preview caption",
      copyLink: "Copy Link",
    },
  },
  ja: {
    auth: {
      title: "Memoriaへようこそ",
      subtitle:
        "Googleアカウントでサインインして記念日を保存し、Googleカレンダーと同期し、デバイスをまたいでリマインダーを管理しましょう。",
      whyGoogle: "Googleサインインの理由",
      benefit1: "ワンタップで素早くアカウント作成",
      benefit2: "別途パスワード不要の安全なサインイン",
      benefit3: "Googleカレンダーとの簡単連携",
      continueWithGoogle: "Googleでログイン",
    },
    nav: {
      home: "ホーム",
      list: "リスト",
      add: "追加",
      settings: "設定",
    },
    titles: {
      home: "ホーム",
      list: "全ての記念日",
      detail: "詳細",
      addAnniversary: "記念日を追加",
      editAnniversary: "記念日を編集",
      settings: "設定",
      welcome: "ようこそ",
    },
    home: {
      nextAnniversary: "次の記念日",
      daysLeft: "日後",
      milestone: "マイルストーン",
      noAnniversaries: "記念日がありません。最初の記念日を追加しましょう。",
      saved: "登録数",
      events: "件",
      synced: "同期済み",
      calendar: "カレンダー",
      in: "あと",
      days: "日",
      upcoming: "近日予定",
      viewAll: "全て見る",
    },
    list: {
      search: "記念日を検索",
      all: "すべて",
      daysLeft: "日",
    },
    detail: {
      elapsed: "経過時間",
      nextEvent: "次のイベント",
      daysLeft: "日後",
      yearProgress: "年間進捗",
      nextMilestone: "次のマイルストーン",
      inDays: "あと",
      days: "日",
      totalDays: "総経過日数",
      noMemo: "メモはまだありません。",
      weekAlert: "1週間前アラート",
      weekAlertDesc: "プッシュ通知を有効化",
      googleCalendar: "Googleカレンダー同期",
      googleCalendarDesc: "毎年繰り返しイベント",
      milestone: "マイルストーン",
      edit: "編集",
      delete: "削除",
    },
    form: {
      emoji: "絵文字",
      date: "日付",
      nameEn: "名前（英語）",
      nameJa: "名前（日本語）",
      category: "カテゴリ",
      newCategory: "新しいカテゴリ",
      repeatYearly: "毎年繰り返す",
      repeatYearlyDesc: "誕生日や記念日に",
      weekAlert: "1週間前アラート",
      weekAlertDesc: "当日前にリマインダーを送信",
      milestoneAlert: "マイルストーンアラート",
      milestoneAlertDesc: "1000/2000/3000日に通知",
      googleCalendar: "Googleカレンダー同期",
      googleCalendarDesc: "カレンダーイベントを自動作成",
      memo: "メモ",
      memoPlaceholder: "ギフトのアイデア、メモ、計画...",
      addAnniversary: "記念日を追加",
      updateAnniversary: "記念日を更新",
      namePlaceholderEn: "Mom's Birthday",
      namePlaceholderJa: "母の誕生日",
    },
    settings: {
      account: "アカウント",
      signedIn: "Googleでサインイン中",
      language: "言語",
      categories: "カテゴリ",
      defaultNotification: "デフォルト通知",
      defaultNotificationDesc: "各イベントの1週間前",
      milestoneNotification: "マイルストーン通知",
      milestoneNotificationDesc: "1000, 2000, 3000日の3日前",
      googleCalendar: "Googleカレンダー",
      connected: "接続済み",
      quickActions: "クイックアクション",
      goToHome: "ホームへ",
      resetData: "データをすべて削除",
      signOut: "サインアウト",
    },
    share: {
      shareTitle: "この記念日をシェア",
      shareSubtitle: "SNSでお祝いやリマインダーを送りましょう。",
      systemShare: "システム共有",
      generatePng: "PNG生成",
      saveTemplate: "テンプレート保存",
      previewCaption: "プレビューキャプション",
      copyLink: "リンクをコピー",
    },
  },
};
