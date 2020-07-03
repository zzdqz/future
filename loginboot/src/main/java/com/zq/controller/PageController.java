package com.zq.controller;

import com.zq.domain.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
public class PageController {

    //登陆处理
    @RequestMapping("/dealmain")
    public String dealLogin(User user){
        //获取subject
        try {
            Subject subject = SecurityUtils.getSubject();//从安全管理器获取
            UsernamePasswordToken token = new UsernamePasswordToken(user.getUserName(),user.getPassWord());
            subject.login(token);
            if (subject.isAuthenticated()){//判定登陆是否成功
                return "main";//返回主页面
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";//重新登陆
    }

    //first视图
    @RequestMapping("/first")
    public String first(){
        return "first";
    }

    //second视图
    @RequestMapping("/second")
    public String second(){
        return "second";
    }

    //无权访问视图
    @RequestMapping("/unauth")
    public String no(){
        return "no";
    }
}
