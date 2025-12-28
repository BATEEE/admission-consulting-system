package com.ttt.careerservice.dto;

public class UserStatisticsDTO {
    private int year;
    private Integer month;   // có thể null khi không dùng
    private Integer quarter; // có thể null khi không dùng
    private long count;

    public UserStatisticsDTO(int year, Integer month, Integer quarter, long count) {
        this.year = year;
        this.month = month;
        this.quarter = quarter;
        this.count = count;
    }

    public int getYear() {
        return year;
    }

    public Integer getMonth() {
        return month;
    }

    public Integer getQuarter() {
        return quarter;
    }

    public long getCount() {
        return count;
    }
}
