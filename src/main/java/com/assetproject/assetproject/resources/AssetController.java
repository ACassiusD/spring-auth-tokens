package com.assetproject.assetproject.resources;

import com.assetproject.assetproject.services.*;
import com.assetproject.assetproject.services.request.AuthenticationRequest;
import com.assetproject.assetproject.services.request.CreateRequest;
import com.assetproject.assetproject.services.request.UpdateRequest;
import com.assetproject.assetproject.services.response.AuthenticationResponse;
import com.assetproject.assetproject.services.response.CreateResponse;
import com.assetproject.assetproject.util.JwtUtil;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AssetController {

    @Autowired
    private AssetService assetService;

    //https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/authentication/AuthenticationManager.html
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;


    @CrossOrigin(origins = "*")
    @GetMapping("/test123")
    public String testFunction(){
        return "test123";
    }


    @CrossOrigin("*")
    @RequestMapping("hello")
    public String helloWorld(@RequestParam(value="name", defaultValue="World") String name) {
        return "Hello "+name+"!!";
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/getAssets")
    public List<Asset> getAllAssets(@RequestParam(value="name", defaultValue="World") String name) {
        return assetService.getAll();
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<?>  create(@RequestBody CreateRequest createRequest) throws Exception{
        //Super basic and bad error handling
        if( (createRequest.getAssetTypeId() != 1  && createRequest.getAssetTypeId() != 2) || createRequest.getName() == null || createRequest.getDescription() == null || createRequest.getPrice() == 0){
            return ResponseEntity.ok(new CreateResponse("Error", "All fields must be provided and valid"));
        }
        try {
            assetService.create(createRequest);
            return ResponseEntity.ok(new CreateResponse("Success", null));
        }
        catch (Exception e){
            return ResponseEntity.ok(new CreateResponse("Error", e.getMessage()));
        }
    }

    //@RequestBody parses the username and password from the request body
    @CrossOrigin(origins = "*")
    @RequestMapping (value = "authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        try{
            UsernamePasswordAuthenticationToken userToAuth = new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword());
            authenticationManager.authenticate(userToAuth);
        } catch (BadCredentialsException e){
            return ResponseEntity.ok(new CreateResponse("Error", e.getMessage()));
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
    @CrossOrigin(origins = "*")
    @RequestMapping (value = "/update", method = RequestMethod.POST)
    public ResponseEntity<?> updateAsset(@RequestBody UpdateRequest updateRequest) throws Exception {
        try {
            assetService.update(updateRequest);
            return ResponseEntity.ok(new CreateResponse("Success", null));
        } catch (Exception e) {
            return ResponseEntity.ok(new CreateResponse("Error", e.getMessage()));
        }
    }

    //Tried url param for this one
    @CrossOrigin(origins = "*")
    @RequestMapping (value = "/delete", method = RequestMethod.POST)
    public ResponseEntity<?> delete(@RequestParam String id) {
        try {
            Integer deleteId = Integer.parseInt(id);
            assetService.delete(deleteId);
            return ResponseEntity.ok(new CreateResponse("Success", null));
        } catch (Exception e) {
            return ResponseEntity.ok(new CreateResponse("Error", e.getMessage()));
        }
    }
}
