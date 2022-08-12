package com.assetproject.assetproject.services.response;

public class CreateResponse {
    private final String status;
    private final String errorMessage;

    public CreateResponse(String status, String errorMessage) {
        this.status = status;
        this.errorMessage = errorMessage;
    }

    public String getStatus() {
        return status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
