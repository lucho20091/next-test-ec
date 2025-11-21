# AI Rules for TechStore Application

This document outlines the core technologies and libraries used in the TechStore application, along with guidelines for their appropriate use.

## Tech Stack Overview

*   **Next.js**: The application is built using Next.js, leveraging its App Router for routing, server components, and API routes.
*   **React**: The primary library for building user interfaces.
*   **TypeScript**: Preferred language for all new components, pages, and utility files to ensure type safety and maintainability.
*   **Tailwind CSS**: Used for all styling, providing a utility-first approach for responsive and consistent designs.
*   **shadcn/ui**: A collection of re-usable components built with Radix UI and Tailwind CSS, used for consistent and accessible UI elements.
*   **Prisma**: An ORM (Object-Relational Mapper) for database interactions, providing a type-safe way to query and manipulate data.
*   **Stackframe/Stack**: Utilized for authentication and user management, providing secure and streamlined user flows.
*   **Cloudinary**: Integrated for image storage and management, handling uploads and serving product images.
*   **PayPal React SDK**: Used for processing payments, providing a secure and familiar checkout experience.
*   **React Hot Toast**: A library for displaying toast notifications to users for feedback and important events.
*   **Lucide React**: A collection of beautiful and customizable SVG icons used throughout the application.
*   **Next.js Server Actions**: Employed for server-side data mutations and logic, ensuring efficient and secure operations.

## Library Usage Rules

To maintain consistency and best practices, please adhere to the following guidelines when using libraries:

*   **UI Components**:
    *   Always prioritize `shadcn/ui` components for common UI elements (e.g., `Button`, `Card`, `Input`, `Label`, `Badge`, `Separator`).
    *   For custom styling or components not available in `shadcn/ui`, use **Tailwind CSS** classes directly. Avoid inline styles or separate CSS files.
*   **Authentication & User Management**:
    *   Use `@stackframe/stack` for all authentication-related functionalities, including sign-in, sign-out, and user session management.
    *   User data fetching and manipulation should primarily go through the `lib/actions/user.js` module, which interacts with Stackframe and Prisma.
*   **Database Interactions**:
    *   All database operations (CRUD) must be performed using **Prisma Client** via the `lib/prisma.js` instance.
    *   Encapsulate database logic within Next.js Server Actions (`"use server"`) in `lib/actions/` files.
*   **Image Uploads**:
    *   Utilize the existing Cloudinary integration (`/api/signature` route) for handling image uploads.
*   **Payments**:
    *   Integrate with the **PayPal React SDK** for all payment processing on the client-side.
    *   Server-side order creation and updates should use the functions in `lib/actions/order.js`.
*   **Notifications**:
    *   Use `react-hot-toast` for all user feedback notifications (success, error, loading, general messages). Refer to `lib/utils/toast.js` for helper functions.
*   **Icons**:
    *   Always use icons from the `lucide-react` library.
*   **Routing**:
    *   Leverage **Next.js App Router** for all navigation and page structures.
    *   Keep routes in `src/App.tsx` (or `app/layout.jsx` for root layout) and pages in `src/pages/` (or `app/` for Next.js App Router pages).
*   **State Management**:
    *   For global or shared client-side state, use **React Context API** (e.g., `CartContext`).
    *   For local component state, use React's `useState` and `useReducer` hooks.
*   **Server-side Logic**:
    *   For data fetching and mutations that require server-side execution, use **Next.js Server Actions** (`"use server"`).
*   **Rate Limiting**:
    *   The custom rate-limiting utility in `lib/utils/ratelimit.js` should be used for API protection where applicable.
*   **Telegram Integration**:
    *   Use the functions in `lib/actions/telegram.js` to send messages or order notifications to Telegram.