package com.zzd.mibober.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface PhotoService {

    List<Map> findAllPhotos();
}
