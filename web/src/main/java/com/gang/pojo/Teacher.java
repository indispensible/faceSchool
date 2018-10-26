package com.gang.pojo;

public class Teacher {
    private Integer tid;

    private String email;

    private String password;

    private String iphone;

    private String identification;

    private String realname;

    private String username;

    private Integer status;

    private Integer ifDelete;

    private Integer adoptByAId;

    private Integer deleteByAId;

    private Administrator adoptAdministrator;

    private Administrator deleteAdministrator;

    public Teacher(Integer tid, String email, String password, String iphone, String identification, String realname, String username,Integer status,Integer ifDelete) {
        this.tid = tid;
        this.email = email;
        this.password = password;
        this.iphone = iphone;
        this.identification = identification;
        this.realname = realname;
        this.username = username;
        this.status=status;
        this.ifDelete=ifDelete;
    }

    public Teacher(String email, String password, String iphone, String identification, String realname, String username,Integer status,Integer ifDelete) {
        this.email = email;
        this.password = password;
        this.iphone = iphone;
        this.identification = identification;
        this.realname = realname;
        this.username = username;
        this.status=status;
        this.ifDelete=ifDelete;
    }

    public Teacher( Integer tid,Integer status,Integer ifDelete,Integer adoptByAId) {
        this.tid=tid;
        this.status=status;
        this.ifDelete=ifDelete;
        this.adoptByAId=adoptByAId;
    }

    public Teacher( Integer tid,Integer status,String username,Integer ifDelete,Integer deleteByAId) {
        this.tid=tid;
        this.status=status;
        this.username=username;
        this.ifDelete=ifDelete;
        this.deleteByAId=deleteByAId;
    }

    public Teacher(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Teacher(String email, String iphone, String realname) {
        this.email = email;
        this.iphone = iphone;
        this.realname = realname;
    }

    public Teacher() {
        super();
    }

    public Integer getTid() {
        return tid;
    }

    public void setTid(Integer tid) {
        this.tid = tid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
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

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification == null ? null : identification.trim();
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getIfDelete() {
        return ifDelete;
    }

    public void setIfDelete(Integer ifDelete) {
        this.ifDelete = ifDelete;
    }

    public Integer getAdoptByAId() {
        return adoptByAId;
    }

    public void setAdoptByAId(Integer adoptByAId) {
        this.adoptByAId = adoptByAId;
    }

    public Integer getDeleteByAId() {
        return deleteByAId;
    }

    public void setDeleteByAId(Integer deleteByAId) {
        this.deleteByAId = deleteByAId;
    }

    public Administrator getDeleteAdministrator() {
        return deleteAdministrator;
    }

    public void setDeleteAdministrator(Administrator deleteAdministrator) {
        this.deleteAdministrator = deleteAdministrator;
    }

    public Administrator getAdoptAdministrator() {
        return adoptAdministrator;
    }

    public void setAdoptAdministrator(Administrator adoptAdministrator) {
        this.adoptAdministrator = adoptAdministrator;
    }
}