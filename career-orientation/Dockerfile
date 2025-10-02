# Giai đoạn Build: Sử dụng Maven và OpenJDK 17
FROM maven:3-openjdk-17 AS build

# Đặt thư mục làm việc chính là thư mục chứa pom.xml
WORKDIR /app/career-service

# Sao chép toàn bộ mã nguồn vào /app (giữ cấu trúc thư mục)
COPY . /app/

# Chạy lệnh build Maven từ thư mục /app/career-service
RUN mvn clean package -DskipTests

# Giai đoạn Run: Sử dụng OpenJDK 17 tối giản
FROM openjdk:17-jdk-slim

# Thiết lập cổng lắng nghe
EXPOSE 8080

# Sao chép file JAR đã build
WORKDIR /app
# Dùng tên file chính xác từ pom.xml và đổi đuôi sang .jar
COPY --from=build /app/career-service/target/career-service-0.0.1-SNAPSHOT.jar drcomputer.jar

# Lệnh khởi chạy ứng dụng (chạy file .jar)
ENTRYPOINT ["java","-jar","drcomputer.jar"]