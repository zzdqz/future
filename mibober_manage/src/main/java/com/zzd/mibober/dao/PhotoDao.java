package com.zzd.mibober.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface PhotoDao {
    List<Map> findAllPhotos();
}
