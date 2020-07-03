package com.zq.controller;


import com.zq.domain.Message;
import com.zq.domain.User;
import com.zq.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/userController")
public class UserController {

    @Autowired
    private UserService userService;

    HttpServletRequest request;

    HttpServletResponse response;
    @RequestMapping("/loginjk")
    @ResponseBody
    public String logina(){
        System.out.println("String logina()方法;");
        return "savadvvd";

    }

    @RequestMapping("/logina")
    @ResponseBody
    public Map logina(@RequestParam Map<String, Object> param/*@RequestBody String username ,@RequestBody String password*/) {
       /* String username = request.getParameter("username");
        String password = request.getParameter("password");*/
        String username = (String) param.get("username");
        String password = (String) param.get("password");
     /*   String username = user.getUserName();
        String password = user.getPassWord();*/
        System.out.println("userControlle的logina方法进来了....");
        System.out.println("username : " + username + ".....");
        System.out.println("password : " + password + ".....");
        log.debug("debug");
        User user = new User();
        user.setPassWord(password);
        user.setUserName(username);
        Map loginResult = userService.loginUser(user);



        return loginResult;
    }

}
