# ClusterCart – Customer Segmentation Web App

![ClusterCart Logo](./public/logo.png) <!-- Replace with actual logo path -->

<p align="center">
  <b>ClusterCart</b> is a modern, minimalistic Customer Segmentation Web App built as a Final-Year Project.  
  It allows users to upload customer datasets, explore clustering visualizations, and view dashboards & insights — all in one place.
</p>

---

## 📝 Overview

ClusterCart is a **Customer Segmentation Web Application** designed to help businesses better understand their customers.  
With an intuitive UI and modern tech stack, users can:

- **Upload CSV datasets** and store them securely.
- **Visualize customer clusters** (demo version).
- **Explore dashboards and insights** to make data-driven decisions.

---

## 🛠 Tech Stack

| Technology     | Purpose |
|---------------|---------|
| **[Next.js (App Router)](https://nextjs.org/)** | Frontend framework for building a fast, scalable web app |
| **[Appwrite](https://appwrite.io/)** | Backend-as-a-Service for database and storage |
| **[Clerk](https://clerk.com/)** | Authentication (Email + Google Sign-in) |
| **[shadcn/ui](https://ui.shadcn.com/)** | UI components for a clean, accessible design |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS for styling |
| **[Recharts](https://recharts.org/en-US/)** | Data visualization library for cluster graphs |

---

## ✨ Features

- **Authentication**
  - Email + Google Sign-in (fully working)

-  **Upload Page** (`/upload`)
  - Upload CSV file  
  - Save data to **Appwrite DB**  
  - View & delete saved datasets  

-  **Clusters Page** (`/clusters`)
  - Placeholder visualization with **Recharts** (Demo)

-  **Dashboard Page** (`/dashboard`)
  - Sample analytics dashboard (Demo)

-  **Insights Page** (`/insights`)
  - Recommendations and customer insights(Demo)  


## ⚙️ Installation & Setup

Follow these steps to run ClusterCart locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/antaripdebgupta/customer-segmentation.git

cd customer-segmentation

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure environment variables
# Create a `.env.local` file in the root and add:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=public-key
CLERK_SECRET_KEY=secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=project_id
APPWRITE_API_KEY=api_key
APPWRITE_DATABASE_ID=database_id
APPWRITE_COLLECTION_ID=collection_id
APPWRITE_BUCKET_ID=bucket_id

# 4️⃣ Run locally
npm run dev
