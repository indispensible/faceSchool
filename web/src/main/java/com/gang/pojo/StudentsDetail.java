package com.gang.pojo;

public class StudentsDetail {
    private Integer sid;

    private Integer cid;

    private String realname;

    private String mhUsername;

    private Integer a1;

    private Integer a2;

    private Integer a3;

    private Integer a4;

    private Integer a5;

    private Integer studentCountSign;

    public StudentsDetail(Integer sid, Integer cid, String realname, String mhUsername, Integer a1, Integer a2, Integer a3, Integer a4, Integer a5, Integer studentCountSign) {
        this.sid = sid;
        this.cid = cid;
        this.realname = realname;
        this.mhUsername = mhUsername;
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.a4 = a4;
        this.a5 = a5;
        this.studentCountSign = studentCountSign;
    }

    public StudentsDetail() {}

    public Integer getStudentCountSign() {
        return studentCountSign;
    }

    public void setStudentCountSign(Integer studentCountSign) {
        this.studentCountSign = studentCountSign;
    }

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public String getMhUsername() {
        return mhUsername;
    }

    public void setMhUsername(String mhUsername) {
        this.mhUsername = mhUsername;
    }

    public Integer getA1() {
        return a1;
    }

    public void setA1(Integer a1) {
        this.a1 = a1;
    }

    public Integer getA2() {
        return a2;
    }

    public void setA2(Integer a2) {
        this.a2 = a2;
    }

    public Integer getA3() {
        return a3;
    }

    public void setA3(Integer a3) {
        this.a3 = a3;
    }

    public Integer getA4() {
        return a4;
    }

    public void setA4(Integer a4) {
        this.a4 = a4;
    }

    public Integer getA5() {
        return a5;
    }

    public void setA5(Integer a5) {
        this.a5 = a5;
    }

}