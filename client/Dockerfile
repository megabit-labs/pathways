# Use the alpine image 
FROM node:13.12.0-alpine 

# Set the workdir 
WORKDIR /app
# Add the node dependencies to the path.
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent

# Copy the code.
COPY . ./

# Build the public directory.
CMD npm run build

