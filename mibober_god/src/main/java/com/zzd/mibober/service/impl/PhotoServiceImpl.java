package com.zzd.mibober.service.impl;

import com.zzd.mibober.dao.PhotoDao;
import com.zzd.mibober.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PhotoServiceImpl implements PhotoService {

    @Autowired
    private PhotoDao photoDao;

    @Override
    public List<Map> findAllPhotos() {
        return photoDao.findAllPhotos();
    }
}
