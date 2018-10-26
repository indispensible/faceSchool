package com.gang.common.clawer;

public class Course {
    private String courseID;
    private String courseName;
    private String teacher;
    private String courseTime;

    public String getCourseID() {
        return courseID;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getTeacher() {
        return teacher;
    }

    public String getCourseTime() {
        return courseTime;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public void setCourseTime(String courseTime) {
        this.courseTime = courseTime;
    }

    public Course() {
        courseID = "";
        courseName = "";
        teacher = "";
        courseTime = "";
    }

    public Course(String courseID, String courseName, String teacher, String courseTime) {
        this.courseID = courseID;
        this.courseName = courseName;
        this.teacher = teacher;
        this.courseTime = courseTime;
    }

    public String getSql(String username) {
        return "INSERT INTO course VALUES('" + username + "', '" + courseID + "', '" + courseName + "', '" + teacher + "', '" + courseTime + "');";
    }
}
