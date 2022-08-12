package com.assetproject.assetproject.services.request;

import java.util.Date;

public class CreateRequest {

    private String name;
    private String description;
    private float price;
    private int assetTypeId;

    public CreateRequest() {
    }

    public CreateRequest(String name, String description, float price, int assetTypeId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.assetTypeId = assetTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getAssetTypeId() {
        return assetTypeId;
    }

    public void setAssetTypeId(int assetTypeId) {
        this.assetTypeId = assetTypeId;
    }
}
