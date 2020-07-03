package com.zq.dao;


import com.zq.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Mapper
@Repository
public interface UserDao {

     // @Select("select * from user where user.id=${loginUser.id} and user.password=${loginUser.password}")
      public User loginUser(User loginUser);


      List<User> queryAllUsers();
}
