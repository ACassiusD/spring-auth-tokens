package com.assetproject.assetproject.services;

import com.assetproject.assetproject.dataaccess.AssetRepository;
import com.assetproject.assetproject.mapper.AssetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

//Business layer logic for assets
//Uses Asset class by leveraging mapper class.
@Component
public class AssetService {

    //Reference to Data Access layer
    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private AssetMapper assetMapper;

    public List<Asset> getAll(){
        return assetMapper.toModels(assetRepository.findAll());
    }
}
