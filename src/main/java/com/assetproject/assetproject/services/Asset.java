package com.assetproject.assetproject.services;

import javax.persistence.Id;
import java.util.Date;

//Product class has more functionality than AssetEntity and used by service class.
//AssetEntity only used to model DB table.
public class Asset {
    //Table column representation
    @Id // Setting the primary key to ID
    private Integer id;
    private String name;
    private String description;
    private float price;
    private Date date;
    private int assetTypeId;


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
