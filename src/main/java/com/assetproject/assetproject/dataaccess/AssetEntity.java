package com.assetproject.assetproject.dataaccess;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OrderColumn;
import java.util.Date;

//May need to rename table to asset entity to work
//All table entities must have an entity class and a repository.
//@Entity tag given for object/relational mapping to the database.
@Entity
public class AssetEntity {

    //Table column representation
    //Apparently you cannot tell spring what order to create these columns in the DB table
    // ... lol  https://stackoverflow.com/questions/1298322/wrong-ordering-in-generated-table-in-jpa
    @Id // Setting the primary key to ID
    private Integer id;
    private String name;
    private String description;
    private float price;
    private Date date;
    private int assetTypeId;
    @OrderColumn


    //Getters
    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public float getPrice() {
        return price;
    }

    public Date getDate() {
        return date;
    }

    public int getAssetTypeId() {
        return assetTypeId;
    }

    //Setters
    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setAssetTypeId(int assetTypeId) {
        this.assetTypeId = assetTypeId;
    }
}
