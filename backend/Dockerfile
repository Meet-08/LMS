# Build stage: use Eclipse Temurin JDK 21 and install Maven
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

# Install Maven (using apt-get)
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Copy Maven configuration and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and build the project
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage: use Eclipse Temurin JRE 21 to run the application
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the built JAR from the build stage.
# Note: Adjust the JAR file name to match your Maven artifact (LMS-0.0.1-SNAPSHOT.jar)
COPY --from=build /app/target/LMS-0.0.1-SNAPSHOT.jar app.jar

# Expose the port as defined in your application.properties
EXPOSE 5000

ENTRYPOINT ["java", "-jar", "app.jar"]
