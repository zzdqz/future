package com.zq;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = "com.zq.*")
public class LoginbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(LoginbootApplication.class, args);
    }

}
