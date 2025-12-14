FROM maven:3.9-eclipse-temurin-17

WORKDIR /app

# Install inotify-tools for file watching
RUN apt-get update && apt-get install -y inotify-tools && rm -rf /var/lib/apt/lists/*

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Expose port
EXPOSE 8080

# Copy hot reload script
COPY watch-compile.sh /app/watch-compile.sh
RUN chmod +x /app/watch-compile.sh

# Run with Spring Boot DevTools for hot reload
CMD ["mvn", "spring-boot:run"]
