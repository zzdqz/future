package com.zzd.mibober.action;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zzd.mibober.dao.UserDao;
import com.zzd.mibober.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@PropertySource(value = "classpath:application.yml", encoding = "utf-8")
public class HelloAction {


    @Autowired
    private UserDao userDao;

    @Autowired
    private PhotoService photoService;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    //    redis使用
    @ResponseBody
    @RequestMapping("/hello")
    public String hello() throws JsonProcessingException {
        String userdata = redisTemplate.boundValueOps("mibober").get();
        ArrayList<Object> arrayList = new ArrayList<>();
        if (userdata == null) {

            List<Map> maps1 = userDao.queryUserAll();

            ObjectMapper om = new ObjectMapper();
            userdata = om.writeValueAsString(maps1);
            redisTemplate.boundValueOps("mibober").set(userdata);

        }
        String mibober = redisTemplate.boundValueOps("mibober").get();
        return "mibober:" + mibober;
    }

    @GetMapping("/index")
    public String user(Model model) {
        model.addAttribute("title", "欢迎来到用户界面");
        return "index";
    }

    @GetMapping("/findallphotos")
    @ResponseBody
    public List<Map> user() {
        List<Map> allPhotos = photoService.findAllPhotos();
        return allPhotos;
    }


}
