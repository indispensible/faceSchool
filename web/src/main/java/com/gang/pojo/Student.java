package com.gang.pojo;

public class Student {
    private Integer id;

    private String username;

    private String password;

    private String iphone;

    private String mhUsername;

    private String mhPassword;

    private String picture;

    private String realname;

    private String name;

    private SCRealation scRealation;

    public Student(Integer id, String username, String password, String iphone, String mhUsername, String mhPassword, String picture, String realname, String name) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.iphone = iphone;
        this.mhUsername = mhUsername;
        this.mhPassword = mhPassword;
        this.picture = picture;
        this.realname = realname;
        this.name = name;
    }

    public Student(String username, String password, String iphone, String mhUsername, String mhPassword, String picture, String realname, String name) {
        this.username = username;
        this.password = password;
        this.iphone = iphone;
        this.mhUsername = mhUsername;
        this.mhPassword = mhPassword;
        this.picture = picture;
        this.realname = realname;
        this.name = name;
    }

    public Student(String username, String iphone, String mhUsername, String realname) {
        this.username = username;
        this.iphone = iphone;
        this.mhUsername = mhUsername;
        this.realname = realname;
    }

    public Student(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Student() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getIphone() {
        return iphone;
    }

    public void setIphone(String iphone) {
        this.iphone = iphone == null ? null : iphone.trim();
    }

    public String getMhUsername() {
        return mhUsername;
    }

    public void setMhUsername(String mhUsername) {
        this.mhUsername = mhUsername == null ? null : mhUsername.trim();
    }

    public String getMhPassword() {
        return mhPassword;
    }

    public void setMhPassword(String mhPassword) {
        this.mhPassword = mhPassword == null ? null : mhPassword.trim();
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture == null ? null : picture.trim();
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public SCRealation getScRealation() {
        return scRealation;
    }

    public void setScRealation(SCRealation scRealation) {
        this.scRealation = scRealation;
    }
}