package com.assetproject.assetproject.services;

// Input argument to authenticate method
// Class is structure for what user will send in the post request.
// Contains getters, setters and constructors.
public class AuthenticationRequest {
    private String username;

    private String password;

    //CONSTRUCTORS.
    public AuthenticationRequest() {
    }

    public AuthenticationRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }


    //GETTERS
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }


    //SETTERS
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
