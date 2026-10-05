# ---- Stage 1: Base image ----
FROM node:22-alpine

# ---- Stage 2: Set working directory inside the container ----
WORKDIR /app

# ---- Stage 3: Copy dependency files first (for caching) ----
COPY package*.json ./

# ---- Stage 4: Install dependencies ----
RUN npm install --omit=dev

# ---- Stage 5: Copy the rest of the app ----
COPY . .

# ---- Stage 6: Tell Docker which port the app uses ----
EXPOSE 3000

# ---- Stage 7: Command to run when container starts ----
CMD ["node", "server.js"]
