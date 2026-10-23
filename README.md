# Gopal Gupta - Portfolio Website

A modern dark-themed personal portfolio web application for Gopal Gupta, showcasing his work as a Java Full-Stack Developer & UI/UX Designer.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Custom dark theme with neon green (#00ff88) accent color

## Features

- **Hero Section**: Profile introduction with "Available for work" status badge
- **Stats Section**: Project counts, experience, clients, and achievements
- **Experience Timeline**: Work history and training with detailed descriptions
- **Projects Gallery**: Showcase of 4 key projects with hover effects
- **Education**: Academic background display
- **Skills**: Tech stack icons (Java, SQL, Figma, Framer, Illustrator)
- **Contact Form**: Validated form that saves submissions to PostgreSQL database
- **Sticky Navigation**: Smooth scroll to sections with responsive mobile menu
- **Animations**: Framer Motion for scroll reveals and interactions

## Project Structure

```
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── layout/      # Layout components (Navbar, Footer)
│   │   │   ├── sections/    # Page sections (Hero, Projects, etc.)
│   │   │   └── ui/          # Shadcn UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   └── index.css        # Dark theme with neon green accents
├── server/                  # Backend Express application
│   ├── db.ts               # Database connection
│   ├── storage.ts          # Data access layer
│   └── routes.ts           # API endpoints
├── shared/                  # Shared types and schemas
│   ├── schema.ts           # Drizzle ORM database schema
│   └── routes.ts           # API contract definitions
```

## API Endpoints

- `POST /api/contact` - Submit contact form message

## Database Schema

### contact_messages
- id: serial (primary key)
- name: text (required)
- email: text (required, validated)
- phone: text (optional)
- message: text (required)
- created_at: timestamp (auto-generated)

## Contact Information

- **Email**: gopaljilab@gmail.com
- **Location**: Bengaluru, Karnataka, India

## Design Details

- **Background**: Deep dark (#0a0a0a)
- **Primary Color**: Neon Green (HSL: 152 100% 50%)
- **Cards**: Slightly lighter than background with soft shadows
- **Typography**: DM Sans (body), Outfit (headings)
- **Effects**: Soft glows, smooth transitions, rounded corners

## Running the App

The app runs on port 5000 and is configured to start automatically with `npm run dev`.

## Future Enhancements

- Add real CV download functionality
- Connect social media links (GitHub, LinkedIn, Twitter)
- Add project details pages
- Implement dark/light mode toggle (currently dark only)
- Add blog section for technical articles
