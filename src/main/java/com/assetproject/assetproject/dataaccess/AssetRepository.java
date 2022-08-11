package com.assetproject.assetproject.dataaccess;

import org.springframework.data.repository.CrudRepository;

//Declared as an interface. Extending CrudRepository
//AssetEntity is the class used for this repo, Integer is the datatype of the primary key.
public interface AssetRepository extends CrudRepository<AssetEntity, Integer> {
}
