package com.assetproject.assetproject.mapper;

import com.assetproject.assetproject.dataaccess.AssetEntity;
import com.assetproject.assetproject.services.Asset;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AssetMapper {

    public AssetEntity toEntity(Asset asset){
        AssetEntity entity = new AssetEntity();
        entity.setId(asset.getId());
        entity.setName(asset.getName());
        entity.setDescription(asset.getDescription());
        entity.setPrice(asset.getPrice());
        entity.setDate(asset.getDate());
        entity.setAssetTypeId(asset.getAssetTypeId());
        return entity;
    }

    public Asset toModel(AssetEntity AssetEntity){
        Asset model = new Asset();
        model.setId(AssetEntity.getId());
        model.setName(AssetEntity.getName());
        model.setDescription(AssetEntity.getDescription());
        model.setPrice(AssetEntity.getPrice());
        model.setDate(AssetEntity.getDate());
        model.setAssetTypeId(AssetEntity.getAssetTypeId());
        return model;
    }

    public List<AssetEntity> toEntities(Iterable<Asset> assetList){
        List<AssetEntity> assetEntitiesList = new ArrayList<AssetEntity>();

        assetList.forEach(asset -> {
            AssetEntity entity = new AssetEntity();
            entity.setId(asset.getId());
            entity.setName(asset.getName());
            entity.setDescription(asset.getDescription());
            entity.setPrice(asset.getPrice());
            entity.setDate(asset.getDate());
            entity.setAssetTypeId(asset.getAssetTypeId());
            assetEntitiesList.add(entity);
        });
        return assetEntitiesList;
    }

    public List<Asset> toModels(Iterable<AssetEntity> assetEntities){
        List<Asset> assetList = new ArrayList<Asset>();

        assetEntities.forEach(AssetEntity -> {
            Asset model = new Asset();
            model.setId(AssetEntity.getId());
            model.setName(AssetEntity.getName());
            model.setDescription(AssetEntity.getDescription());
            model.setPrice(AssetEntity.getPrice());
            model.setDate(AssetEntity.getDate());
            model.setAssetTypeId(AssetEntity.getAssetTypeId());
            assetList.add(model);
        });
        return assetList;
    }
}
