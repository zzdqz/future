package com.zq.service.impl;


import com.zq.dao.UserDao;
import com.zq.domain.Message;
import com.zq.domain.User;
import com.zq.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    private Message message;

    public Message login(User loginuser) {

        User currentUser = userDao.loginUser(loginuser);

        if (currentUser.getId() == 0) {
            message.setResult(false);
            message.setDetail("登陆失败.....");
        } else {
            message.setResult(true);
            message.setDetail("登陆成功.....");
        }

        return message;
    }

    @Override
    public List<User> queryForUser() {
        return userDao.queryAllUsers();
    }

    @Override
    public Map loginUser(User user) throws NullPointerException {
        Map resultMap = new HashMap();

        User loginUser = userDao.loginUser(user);
        if (loginUser==null) {
           /* message.setResult(false);
            message.setDetail("登陆失败.....");*/
            resultMap.put("result",false);
            resultMap.put("detail","登陆失败.....");
        } else {
          /*  message.setResult(true);
            message.setDetail("登陆成功.....");*/
            resultMap.put("result",true);
            resultMap.put("detail","登陆成功.....");
        }

        return resultMap;
    }
}
