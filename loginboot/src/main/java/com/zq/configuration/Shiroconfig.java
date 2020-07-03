package com.zq.configuration;


import com.zq.controller.MyShiroRealm;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class Shiroconfig {
    //注入Realm
    @Bean(name = "myShiroRealm")
    public MyShiroRealm getRelam(){
        return new MyShiroRealm();
    }

    //注入SecurityManager
    @Bean(name = "defaultWebSecurityManager")
    public DefaultWebSecurityManager defaultWebSecurityManager(@Qualifier("myShiroRealm") MyShiroRealm myShiroRealm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(myShiroRealm);
        return securityManager;
    }

    //创建权限过滤器
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(@Qualifier("defaultWebSecurityManager") DefaultWebSecurityManager securityManager){
        ShiroFilterFactoryBean filterFactoryBean = new ShiroFilterFactoryBean();
        filterFactoryBean.setSecurityManager(securityManager);
        filterFactoryBean.setLoginUrl("/login");//登陆页
        filterFactoryBean.setUnauthorizedUrl("/unauth");//无权访问页
        Map<String,String> map = new HashMap<>();
        map.put("/main","authc");//只有登陆后才可访问
        map.put("/first","perms[houtaiindex]");//登陆成功后拥有houtaiindex权限才能访问
        map.put("/second","perms[fabu]");//登陆成功后拥有fabu权限才能访问
        filterFactoryBean.setFilterChainDefinitionMap(map);//设置拦截权限
        return filterFactoryBean;
    }
}

