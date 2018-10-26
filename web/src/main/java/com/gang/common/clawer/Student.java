package com.gang.common.clawer;

public class Student {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Student() {
        username = "";
        password = "";
    }

    public Student(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
