
# 🧮 Modern Full-Stack Calculator

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

> A Windows-inspired calculator ensuring precision with a Spring Boot backend and a responsive Angular frontend.

---

## ⚡ Functionality Demo

![App Workflow](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmZ1bmd6eXF6eXF6eXF6eXF6eXF6eXF6eXF6eXF6eXF6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7btQ8jDk7q88S8lq/giphy.gif)

*(Note: Replace the generic GIF above with a screen recording of your actual application!)*

---

## 🎨 Features

| Feature | Description | Status |
| :--- | :--- | :---: |
| **Standard Ops** | Addition, Subtraction, Multiplication, Division | ✅ |
| **Scientific Ops** | Square Root, Power, Logarithms | ✅ |
| **History Log** | View previous calculations in a scrollable side panel | ✅ |
| **Responsive UI** | Mimics the Windows 10/11 Calculator layout | ✅ |
| **API Security** | Input validation on the backend to prevent crashes | ✅ |

---

## 🛠️ Architecture

This project uses a **RESTful** architecture.

```mermaid
graph LR
    A[Angular Client] -- HTTP JSON --> B[Spring Boot Controller]
    B -- Logic --> C[Service Layer]
    C -- Result --> B
    B -- JSON Response --> A
```
# Backend (Spring Boot)
Controller: Handles incoming REST requests (/api/calculate).

Service: Performs the BigDecimal math to ensure high precision.

CORS Config: Allows communication with the Angular localhost.

# Frontend (Angular)
Components: Modular design (Keypad, Display, History).

Services: HTTP Client service to talk to the Spring Boot API.

Styling: CSS Grid/Flexbox for the calculator layout.

## 🚀 How to Run
1. Backend Setup
Bash

cd backend
```mvn spring-boot:run
# Server starts at http://localhost:8080
```
2. Frontend Setup
Bash
```
cd frontend
npm install
ng serve
# UI starts at http://localhost:4200
```
## 👨‍💻 Author
# Mohamed Gomaa

    
