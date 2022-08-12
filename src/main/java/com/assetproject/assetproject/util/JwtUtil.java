package com.assetproject.assetproject.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

//Class designated to JWT Utility functions
//Creates and authenticates JWT's
//RESOURCES
//https://www.youtube.com/watch?v=X80nJ5T7YpE
//https://www.devglan.com/spring-security/spring-boot-jwt-auth
//https://www.javainuse.com/spring/boot-jwt
//https://www.youtube.com/watch?v=lA18U8dGKF8
//https://blog.iamprafful.com/spring-boot-rest-api-authentication-best-practices-using-jwt-2022
@Service
public class JwtUtil {
    private String SECRET_KEY = "mylongsecretbecausethelastonewaytooshort123235345";

    public String generateToken(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    public String extractUsername(String  token){
        return extractClaim(token, Claims::getSubject);
    }
    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token){
        //Token verification happens here. If we set signing key to something different than the secret key, then it fails.
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }
    public String createToken(Map<String, Object> claims, String subject){
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 10)) // 10 hours expiration
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
