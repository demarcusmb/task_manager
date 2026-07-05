# To build docker build -t [NAME] .
# To run docker -p [PORT] [NAME]

FROM node:22

LABEL authors="db"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Set port environment variable
ENV PORT=3000

# Expose the port so we can access it
EXPOSE 3000

# Run the app
CMD ["npm", "start"]

