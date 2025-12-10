FROM maven:3.9-eclipse-temurin-17

WORKDIR /app

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Expose port
EXPOSE 8080

# Run with Spring Boot DevTools for hot reload
CMD ["mvn", "spring-boot:run"]
