package com.maps.maps;
import java.util.*;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

@RestController
public class MapsController {
 //  Places API Key 
 private static final String API_KEY = "a8b1b164cb664b1b9da4cf8d80d1f1a2";
    
 //  API URL
private static final String OPENCAGE_API_URL = "https://api.opencagedata.com/geocode/v1/json?q={location}&key={apiKey}";

 @GetMapping("/search")
 public Map<String, Object> searchLocation(@RequestParam("location") String location) {
     RestTemplate restTemplate = new RestTemplate();

     // Call Google Places API with the location input
     Map<String, Object> response = restTemplate.getForObject(OPENCAGE_API_URL, Map.class, location, API_KEY);

     // Return the API response
     return response;
 }
}