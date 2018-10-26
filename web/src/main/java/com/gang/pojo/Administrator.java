package com.gang.pojo;

public class Administrator {
    private Integer id;

    private String username;

    private String password;

    private String email;

    private Integer status;

    private String iphone;

    private String realname;

    public Administrator(Integer id, String username, String password, String email, Integer status, String iphone, String realname) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.status = status;
        this.iphone = iphone;
        this.realname = realname;
    }

    public Administrator(String username, String password, String email, Integer status, String iphone, String realname) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.status = status;
        this.iphone = iphone;
        this.realname = realname;
    }

    public Administrator(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Administrator(Integer id,Integer status) {
        this.id = id;
        this.status = status;
    }

    public Administrator() {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getIphone() {
        return iphone;
    }

    public void setIphone(String iphone) {
        this.iphone = iphone == null ? null : iphone.trim();
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }
}