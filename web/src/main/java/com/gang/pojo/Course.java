package com.gang.pojo;

public class Course {
    private String username;

    private Integer courseid;

    private String coursename;

    private String teacher;

    private String coursetime;

    public Course(String username, Integer courseid, String coursename, String teacher, String coursetime) {
        this.username = username;
        this.courseid = courseid;
        this.coursename = coursename;
        this.teacher = teacher;
        this.coursetime = coursetime;
    }

    public Course() {
        super();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public Integer getCourseid() {
        return courseid;
    }

    public void setCourseid(Integer courseid) {
        this.courseid = courseid;
    }

    public String getCoursename() {
        return coursename;
    }

    public void setCoursename(String coursename) {
        this.coursename = coursename == null ? null : coursename.trim();
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher == null ? null : teacher.trim();
    }

    public String getCoursetime() {
        return coursetime;
    }

    public void setCoursetime(String coursetime) {
        this.coursetime = coursetime == null ? null : coursetime.trim();
    }
}