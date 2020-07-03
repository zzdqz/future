package com.zq.service;

import com.zq.domain.Message;
import com.zq.domain.User;

import java.util.List;
import java.util.Map;

public interface UserService {
    List<User> queryForUser();

    Map loginUser(User user);
}
