export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px", fontFamily: "sans-serif", lineHeight: 1.8, color: "#333" }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 8 }}>プライバシーポリシー</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>最終更新日：2026年4月23日</p>

      <p>Memoria（以下「本アプリ」）は、Seiji Ohno（以下「開発者」）が提供する記念日管理アプリです。本プライバシーポリシーは、本アプリにおける個人情報の取り扱いについて説明します。</p>

      <h2 style={{ fontSize: 20, fontWeight: "bold", marginTop: 32, marginBottom: 12 }}>1. 収集する情報</h2>
      <p>本アプリは以下の情報を収集・利用します。</p>
      <ul style={{ paddingLeft: 24 }}>
        <li><strong>Googleアカウント情報：</strong>ログインのためにGoogleアカウントのメールアドレスを使用します。</li>
        <li><strong>記念日データ：</strong>ユーザーが登録した記念日の名前・日付・メモなどをデバイスのローカルストレージに保存します。</li>
        <li><strong>Googleカレンダーデータ：</strong>ユーザーが同期を有効にした場合のみ、GoogleカレンダーAPIを通じてイベントの作成・更新・削除を行います。</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: "bold", marginTop: 32, marginBottom: 12 }}>2. 情報の利用目的</h2>
      <ul style={{ paddingLeft: 24 }}>
        <li>記念日の管理・表示機能の提供</li>
        <li>Googleカレンダーとの同期機能の提供</li>
        <li>アプリの認証・ログイン機能の提供</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: "bold", marginTop: 32, marginBottom: 12 }}>3. 第三者への情報提供</h2>
      <p>開発者は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。</p>
      <ul style={{ paddingLeft: 24 }}>
        <li>ユーザーの同意がある場合</li>
        <li>法令に基づく場合</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: "bold", marginTop: 32, marginBottom: 12 }}>4. 利用する外部サービス</h2>
      <ul style={{ paddingLeft: 24 }}>
        <li><strong>Supabase：</strong>認証サービスの提供（<a href="https://supabase.com/privacy" style={{ color: "#0066cc" }}>Supabaseプライバシーポリシー</a>）</li>
        <li><strong>Google OAuth / Calendar API：</strong>Googleログインおよびカレンダー連携（<a href="https://policies.google.com/privacy" style={{ color: "#0066cc" }}>Googleプライバシーポリシー</a>）</li>
      </ul>

      <h2 style={{ fontSize: 20, fontWeight: "bold", marginTop: 32, marginBottom: 12 }}>5. データの保存</h2>
      <p>記念日データはユーザーのデバイスのブラウザローカルストレージに保存されます。アカウントデータはSupabaseのサーバーに保存されます。</p>

      <h2 style={{ fontSize: 20, fontWeight: "bold", marginTop: 32, marginBottom: 12 }}>6. お問い合わせ</h2>
      <p>プライバシーポリシーに関するご質問は、以下のメールアドレスまでご連絡ください。</p>
      <p><a href="mailto:seijiono@gmail.com" style={{ color: "#0066cc" }}>seijiono@gmail.com</a></p>

      <hr style={{ marginTop: 48, borderColor: "#eee" }} />
      <p style={{ color: "#999", fontSize: 14 }}>English: This app collects Google account information for authentication, and anniversary data stored locally. Google Calendar data is accessed only when sync is enabled by the user. No personal data is sold to third parties.</p>
    </main>
  );
}
