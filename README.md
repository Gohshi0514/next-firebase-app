# Next.js Authentication with Firebase

This project demonstrates a Next.js application with authentication using NextAuth.js and Firebase. It includes a stylish UI built with Shadcn UI components, form handling with React Hook Form, and schema validation with Zod.

## Features

- User authentication (sign up, sign in, sign out)
- Firebase integration
- Responsive design with Shadcn UI
- Form validation with React Hook Form and Zod
- Protected routes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm or yarn
- A Firebase project

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

2. Copy the `.env.local.example` file to `.env.local`:

```bash
cp .env.local.example .env.local
```

3. Fill in the `.env.local` file with your Firebase configuration and NextAuth settings:

```
NEXTAUTH_SECRET=
NEXTAUTH_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

- `NEXTAUTH_SECRET`: A random string used to hash tokens. You can generate one using `openssl rand -base64 32` in your terminal.
- `NEXTAUTH_URL`: The canonical URL of your site (e.g., `http://localhost:4321` for development).
- The `NEXT_PUBLIC_FIREBASE_*` variables can be found in your Firebase project settings.

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:4321`.

## Built With

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Firebase](https://firebase.google.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/next-auth-firebase/issues).

## License

This project is licensed under the [Super Friendly "Go Ahead and Use It" License](LICENSE).

## Acknowledgements

- Thanks to all the open-source projects that made this possible.
- Special thanks to the Next.js and Firebase communities for their excellent documentation and support.

