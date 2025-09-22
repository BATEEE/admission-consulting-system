package com.ttt.careerservice.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "doyj5yflx",
                "api_key", "873521839721313",
                "api_secret", "e2IId-PhzW9StNIrnb09yVjeAaI"
        ));
    }
}
