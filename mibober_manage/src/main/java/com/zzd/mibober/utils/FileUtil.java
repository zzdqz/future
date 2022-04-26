package com.zzd.mibober.utils;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class FileUtil {

    public static JdbcTemplate jdbcTemplate;

    static {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://127.0.0.1:60331/mibober?useUnicode=true&characterEncoding=utf8");
        dataSource.setUsername("root");
        dataSource.setPassword("mibober");
        //2、创建jdbcTemplate对象，设置数据源
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public static void main(String[] args) {
//         查询数据库是否存在
/*        String createsql="drop table photo";
        jdbcTemplate.execute(createsql);*/
        String tbsql = "CREATE TABLE `photo` (\n" +
                "  `id` int(10)  ,\n" +
                "  `FileName` varchar(255)  ,\n" +
                "  `ImportTime` varchar(255) ,\n" +
                "  `FilePath` varchar(255) ,\n" +
                "  `FileAuthor` varchar(255)  ,\n" +
                "  PRIMARY KEY (`id`)\n" +
                ") ENGINE=InnoDB  DEFAULT CHARSET=utf8;\n";
        jdbcTemplate.execute(tbsql);

        String path = "C:\\mibober";
        List<String> files = new ArrayList<String>();
        File file = new File(path);
        File[] tempList = file.listFiles();
        int count = 1;
        try {
            for (int i = 0; i < tempList.length; i++) {
                String sql = "insert into photo (id,FileName,ImportTime,FilePath,FileAuthor) values ";
                if (tempList[i].isFile()) {
                    files.add(tempList[i].toString());
                    //                只保存图片
                    //文件名，不包含路径
                    String fileName = tempList[i].toString();
                    fileName = fileName.replace("\\", "/");
                    System.out.println(tempList[i].toString());
                    String name = tempList[i].getName();
                    if (name.toLowerCase().indexOf(".mp4") > -1 || name.toLowerCase().indexOf(".mp4") > -1) {
                        continue;
                    }
                    sql += "(" + count + ",'" + tempList[i].getName() + "','" + new Date().getTime() + "',\'" + fileName + "\','壁纸'" + ")";
                    System.out.println(sql);
                    jdbcTemplate.execute(sql);
                    count++;
                    sql = "replace into photo (id,FileName,ImportTime,FilePath,FileAuthor) values ";
                }
                if (tempList[i].isDirectory()) {
                    String filesname = tempList[i].getName();
                    //这里就不递归了，
                    System.out.println("文件夹" + tempList[i].toString());
                    File sunfile = new File(tempList[i].toString());
                    File[] suntempList = sunfile.listFiles();
                    for (int i1 = 0; i1 < suntempList.length; i1++) {
                        if (suntempList[i1].isFile()) {
                            String fileName = suntempList[i1].toString();
                            fileName = fileName.replace("\\", "/");
                            String name1 = suntempList[i1].getName();
                            if (name1.toLowerCase().indexOf(".mp4") > -1 || name1.toLowerCase().indexOf(".txt") > -1) {
                                continue;
                            }
                            sql += "(" + count + ",'" + suntempList[i1].getName() + "','" + new Date().getTime() + "',\'" + fileName + "\','" + filesname + "')";
                            System.out.println(sql);
                            jdbcTemplate.execute(sql);
                            sql = "replace into photo (ID,FileName,ImportTime,FilePath,FileAuthor) values ";
                            count++;
                            continue;
                        }

                    }


                }
            }
        } catch (DataAccessException e) {
            e.printStackTrace();
        }

    }

}
