# Next.js Authentication with Firebase and Google Provider

[日本語版 README はこちら](#nextjsfirebasegoogle認証を使用した認証アプリケーション)

This project demonstrates a Next.js application with authentication using NextAuth.js, Firebase, and Google OAuth. It includes a stylish UI built with Shadcn UI components, form handling with React Hook Form, and schema validation with Zod.

## Features

- User authentication (sign up, sign in, sign out)
- Firebase integration for email/password authentication
- Google OAuth authentication using NextAuth.js (without Firebase Auth)
- Responsive design with Shadcn UI
- Form validation with React Hook Form and Zod
- Protected routes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- A Firebase project
- A Google Cloud project with OAuth 2.0 Client IDs

## Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd next-auth-firebase
```

2. Install the dependencies:

```bash
npm install
```

## Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).

2. Set up a Google Cloud project and create OAuth 2.0 Client IDs for web application.

3. Copy the `.env.local.example` file to `.env.local`:

```bash
cp .env.local.example .env.local
```

4. Fill in the `.env.local` file with your Firebase configuration, Google OAuth, and NextAuth settings:

```
NEXTAUTH_SECRET=
NEXTAUTH_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:4321`.

## Authentication Flow

This project uses two authentication methods:

1. Firebase Authentication for email/password sign-up and sign-in.
2. Google OAuth via NextAuth.js, which doesn't use Firebase Auth for the Google sign-in process.

This dual approach allows for flexible authentication options while leveraging NextAuth.js for session management.

## Built With

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Firebase](https://firebase.google.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)

## License

This project is licensed under the [Super Friendly "Go Ahead and Use It" License](LICENSE.md).

## Acknowledgements

- Thanks to all the open-source projects that made this possible.
- Special thanks to the Next.js, Firebase, and NextAuth.js communities for their excellent documentation and support.

---

# Next.js、Firebase、Google認証を使用した認証アプリケーション

[English README is above](#nextjs-authentication-with-firebase-and-google-provider)

このプロジェクトは、NextAuth.js、Firebase、およびGoogle OAuthを使用して認証機能を実装したNext.jsアプリケーションのデモです。Shadcn UIコンポーネントを使用してスタイリッシュなUIを構築し、React Hook Formでフォーム処理、Zodでスキーマ検証を行っています。

## 特徴

- ユーザー認証（サインアップ、サインイン、サインアウト）
- メール/パスワード認証用のFirebase統合
- NextAuth.jsを使用したGoogle OAuth認証（Firebase Authを使用せず）
- Shadcn UIによるレスポンシブデザイン
- React Hook FormとZodを使用したフォームバリデーション
- 保護されたルート

## 前提条件

始める前に、以下の要件を満たしていることを確認してください：

- Node.js（v14以降）
- npmまたはyarn
- Firebaseプロジェクト
- OAuth 2.0クライアントIDを持つGoogle Cloudプロジェクト

## インストール

1. リポジトリをクローンします：

```bash
git clone [あなたのリポジトリURL]
cd next-auth-firebase
```

2. 依存関係をインストールします：

```bash
npm install
```

## 設定

1. [Firebase Console](https://console.firebase.google.com/)でFirebaseプロジェクトを作成します。

2. Google Cloudプロジェクトをセットアップし、ウェブアプリケーション用のOAuth 2.0クライアントIDを作成します。

3. `.env.local.example`ファイルを`.env.local`にコピーします：

```bash
cp .env.local.example .env.local
```

4. `.env.local`ファイルにFirebaseの設定、Google OAuth、およびNextAuthの設定を入力します：

```
NEXTAUTH_SECRET=
NEXTAUTH_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## アプリケーションの実行

開発サーバーを起動するには：

```bash
npm run dev
```

アプリケーションは`http://localhost:4321`で利用可能になります。

## 認証フロー

このプロジェクトでは2つの認証方法を使用しています：

1. メール/パスワードのサインアップとサインイン用のFirebase認証。
2. NextAuth.jsを介したGoogle OAuth。このプロセスではFirebase Authを使用しません。

この二重アプローチにより、柔軟な認証オプションを提供しつつ、NextAuth.jsでセッション管理を行うことができます。

## 使用技術

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Firebase](https://firebase.google.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)

## ライセンス

このプロジェクトは[超フレンドリー・ご自由にどうぞライセンス](LICENSE.md)の下でライセンスされています。

## 謝辞

- これを可能にしたすべてのオープンソースプロジェクトに感謝します。
- 優れたドキュメントとサポートを提供してくれたNext.js、Firebase、NextAuth.jsのコミュニティに特別な感謝を捧げます。