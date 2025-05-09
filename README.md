# Next.js Support Ticket Application

A modern, full-stack support ticket management system built with Next.js, MongoDB, and shadcn/ui. This application provides a seamless experience for creating, viewing, and managing support tickets with a beautiful and responsive user interface.

## Features

- 🔐 **Authentication**: Secure user authentication using NextAuth.js
- 🎫 **Ticket Management**: Create and view support tickets
- 📱 **Responsive Design**: Mobile-friendly interface using shadcn/ui components
- 🎨 **Modern UI**: Clean and intuitive user interface
- ⚡ **Real-time Updates**: Instant ticket creation and updates
- 🔍 **Form Validation**: Robust form validation using Zod
- 🌙 **Dark Mode**: Built-in dark mode support

## Screenshots

![Home](https://github.com/user-attachments/assets/a2f61886-ae61-428f-9181-97535307bab4)
![PopUp-for-creatingTickets](https://github.com/user-attachments/assets/b7bc43c6-60a5-47df-8d7e-0771dd61fdf6)
![View](https://github.com/user-attachments/assets/7ad94290-b297-423f-bd1c-93a80562b926)

## Tech Stack

- **Frontend**:
  - Next.js 15.3.1
  - React 19
  - shadcn/ui
  - Tailwind CSS
  - React Hook Form
  - Zod

- **Backend**:
  - Next.js API Routes
  - MongoDB
  - Mongoose
  - NextAuth.js

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- MongoDB database
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd support-ticket-application
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGO_URI=your_mongodb_connection_string
```

4. Start the development server:
```bash
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/
│   ├── api/           # API routes
│   ├── view-tickets/  # Ticket viewing page
│   └── layout.tsx     # Root layout
├── components/
│   ├── actions/       # Action components
│   ├── custom/        # Custom components
│   ├── parts/         # Reusable parts
│   └── ui/            # UI components
├── lib/
│   ├── models/        # Database models
│   └── utils/         # Utility functions
└── public/            # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

---

⭐ Star the repository if you find it helpful! ❤️
