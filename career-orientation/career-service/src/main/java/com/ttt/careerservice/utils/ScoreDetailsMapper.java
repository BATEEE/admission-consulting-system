package com.ttt.careerservice.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class ScoreDetailsMapper {
    private static final ObjectMapper mapper = new ObjectMapper();

    // Map -> JSON
    public static String toJson(Map<String, Double> scoreDetails) {
        try {
            return mapper.writeValueAsString(scoreDetails);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting scoreDetails to JSON", e);
        }
    }

    // JSON -> Map
    public static Map<String, Double> fromJson(String json) {
        try {
            return mapper.readValue(json, new TypeReference<Map<String, Double>>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing scoreDetails JSON", e);
        }
    }
}
