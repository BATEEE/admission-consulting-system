# Giai đoạn Build: Sử dụng Maven và OpenJDK 21
FROM maven:3-openjdk-21 AS build

# Đặt thư mục làm việc là thư mục chứa pom.xml
WORKDIR /app/career-service

# Sao chép toàn bộ mã nguồn vào thư mục /app (giữ cấu trúc thư mục)
COPY . /app/

# Chạy lệnh build Maven từ thư mục /app/career-service
RUN mvn clean package -DskipTests

# Giai đoạn Run: Sử dụng OpenJDK 21 tối giản
FROM openjdk:21-jdk-slim

# Thiết lập cổng lắng nghe
EXPOSE 8080

# Sao chép file WAR đã build từ giai đoạn trước
WORKDIR /app
COPY --from=build /app/career-service/target/DrComputer-001-SNAPSHOT.war drcomputer.war

# Lệnh khởi chạy ứng dụng
ENTRYPOINT ["java","-jar","drcomputer.war"]