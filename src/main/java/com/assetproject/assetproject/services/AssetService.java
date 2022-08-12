package com.assetproject.assetproject.services;

import com.assetproject.assetproject.dataaccess.AssetEntity;
import com.assetproject.assetproject.dataaccess.AssetRepository;
import com.assetproject.assetproject.mapper.AssetMapper;
import com.assetproject.assetproject.services.request.CreateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
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

    //getById()

    //create()
    public void create(CreateRequest createRequest){
        AssetEntity assetEntity = new AssetEntity();
        assetEntity.setDate(new Date());

        assetEntity.setAssetTypeId(createRequest.getAssetTypeId());
        assetEntity.setName(createRequest.getName());
        assetEntity.setPrice(createRequest.getPrice());
        assetEntity.setDescription(createRequest.getDescription());

        assetRepository.save(assetEntity);
    }

    //updateById()

    //deleteById()
}
