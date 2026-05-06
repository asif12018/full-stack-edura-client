<h1 align="center">
  🎓 Edura — Modern E-Learning Platform
</h1>

<p align="center">
  <strong>A full-stack, responsive online educational platform enabling seamless course enrollment, interactive assignment workflows, and zero-storage video streaming with robust role-based access control.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" alt="JWT" />
</p>

<p align="center">
  <a href="#-live-demo--access">Live Demo</a> •
  <a href="#-overview--problem-statement">Overview</a> •
  <a href="#-architecture--scalability">Architecture</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a>
</p>

---

## 🔗 Live Demo & Access

**[👉 Try Edura Live Here](https://edura-4b499.web.app/)**

> **Admin Demo Access:**
> * **Email:** `admin@1.com`
> * **Password:** `admin@1.com`
> *(Note: Please explore the dashboard but avoid altering core administrative settings during evaluation).*

---

## 📖 Overview & Problem Statement

**The Problem:** 
Online education platforms often struggle with expensive video hosting overhead, complex user role management (Student vs. Teacher vs. Admin), and fragmented workflows for assignments and payments. Furthermore, ensuring secure API access and protecting user data remains a critical challenge for scalable e-learning systems.

**The Solution:** 
**Edura** solves these pain points by leveraging a decoupled, stateless architecture. It utilizes an embedded, zero-storage responsive player for private YouTube videos, drastically reducing hosting costs and improving load times. The platform implements a strictly typed, role-based ecosystem where users can seamlessly transition from students to educators upon admin approval, all managed through intuitive, segregated dashboards.

---

## 🏗️ Architecture & Scalability

* **Decoupled Client-Server Model:** The React frontend communicates with the Express backend via RESTful APIs, allowing independent scaling of the user interface and business logic.
* **Zero-Storage Media Delivery:** By streaming private YouTube URLs directly through a custom responsive player, the system offloads bandwidth and storage requirements to Google's CDN, ensuring high scalability even during traffic spikes.
* **Stateless Authentication:** JSON Web Tokens (JWT) are used to secure API endpoints, ensuring horizontal scalability of the Node.js backend without session storage bottlenecks.
* **Secure Data Management:** Firebase is utilized to securely manage user authentication data and core platform state.

---

## ✨ Key Features

* **Role-Based Access Control (RBAC):** Distinct, user-friendly dashboards tailored separately for Admins, Teachers, and Students.
* **Complete Admin Governance:** Admins hold full platform authority, including the ability to review, approve, or reject teacher applications and proposed courses.
* **Zero-Storage Video Player:** Responsive, cross-platform media player featuring live previews and fullscreen mode, streaming private YouTube videos without requiring extra server storage.
* **Interactive Academic Workflow:** Students can submit assignments directly through the platform, which are securely routed to the respective instructor for review and grading.
* **Secure Payment Integration:** Seamless course enrollment via integrated credit and debit card processing.
* **Teacher Onboarding:** Standard users have a dedicated pathway to apply to become instructors on the platform.

---

## 📸 Screenshots

*(Replace the placeholder URLs with actual raw image links from your GitHub repository issues/assets)*

### Role-Based Dashboards
| Student Dashboard | Teacher Assignment View | Admin Course Approval |
| :---: | :---: | :---: |
| <img src="https://via.placeholder.com/400x250?text=Student+Dashboard" alt="Student Dashboard" /> | <img src="https://via.placeholder.com/400x250?text=Teacher+View" alt="Teacher View" /> | <img src="https://via.placeholder.com/400x250?text=Admin+Approval" alt="Admin Approval" /> |

### Core Functionality
| Responsive Video Player | Secure Payment Gateway |
| :---: | :---: |
| <img src="https://via.placeholder.com/500x300?text=Video+Player" alt="Video Player" /> | <img src="https://via.placeholder.com/500x300?text=Payment+Gateway" alt="Payment Gateway" /> |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend Framework** | React.js |
| **Backend Framework** | Node.js, Express.js |
| **Database & Auth** | Firebase |
| **API Security** | JSON Web Tokens (JWT) |
| **Data Fetching** | TanStack Query (React Query), Axios |
| **Form Management** | React Hook Form |
| **UI Components** | Swiper Slider, React-Rating |

---

## 🚀 Getting Started

Follow these instructions to run the frontend client on your local machine.

### Prerequisites
* **Node.js** (v16 or higher)
* **npm** or **yarn**
* A **Firebase** account and project (for database and authentication)

### 1. Clone the Repository
```bash
git clone [https://github.com/asif12018/full-stack-edura-client.git](https://github.com/asif12018/full-stack-edura-client.git)
cd full-stack-edura-client
