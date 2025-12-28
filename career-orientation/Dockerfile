FROM maven:3-openjdk-17 AS build

WORKDIR /app/career-service

COPY . /app/

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

EXPOSE 8080

WORKDIR /app

COPY --from=build /app/career-service/target/career-service-0.0.1-SNAPSHOT.jar drcomputer.jar

ENTRYPOINT ["java","-jar","drcomputer.jar"]