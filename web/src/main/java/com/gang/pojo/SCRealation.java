package com.gang.pojo;

import java.util.List;

public class SCRealation {
    private Integer sid;

    private Integer cid;

    private String signattendtime;

    private String signovertime;

    private String signlocation;

    private String oversignlocation;

    private Integer signcount;

    private Integer signstate;

    private Integer ifSign;

    private Class classes;

    private Student student;

    public SCRealation(Integer sid, Integer cid, String signattendtime, String signovertime, String signlocation, Integer signcount, Integer signstate,Class classes,Student student) {
        this.sid = sid;
        this.cid = cid;
        this.signattendtime = signattendtime;
        this.signovertime = signovertime;
        this.signlocation = signlocation;
        this.signcount = signcount;
        this.signstate = signstate;
        this.classes=classes;
        this.student=student;
    }

    public SCRealation(Integer sid, Integer cid,String signattendtime, Integer signcount, Integer signstate, Integer ifSign) {
        this.sid = sid;
        this.cid = cid;
        this.signattendtime=signattendtime;
        this.signcount = signcount;
        this.signstate = signstate;
        this.ifSign=ifSign;
    }

    public SCRealation(Integer sid, Integer cid, Integer signcount,String signovertime, Integer signstate, Integer ifSign) {
        this.sid = sid;
        this.cid = cid;
        this.signcount = signcount;
        this.signovertime=signovertime;
        this.signstate = signstate;
        this.ifSign=ifSign;
    }

    public SCRealation(Integer sid, Integer cid, String signattendtime, String signovertime,  String signlocation, Integer signcount) {
        this.sid = sid;
        this.cid = cid;
        this.signattendtime=signattendtime;
        this.signovertime=signovertime;
        this.signlocation = signlocation;
        this.signcount = signcount;
    }

    public SCRealation(Integer sid, Integer cid, String signattendtime, String signovertime,  Integer signcount, String oversignlocation) {
        this.sid = sid;
        this.cid = cid;
        this.signattendtime=signattendtime;
        this.signovertime=signovertime;
        this.signcount = signcount;
        this.oversignlocation = oversignlocation;
    }

    public SCRealation(Integer sid, Integer cid, Integer signcount ,Integer signstate) {
        this.sid = sid;
        this.cid = cid;
        this.signcount = signcount;
        this.signstate = signstate;
    }

    public SCRealation() {
        super();
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

    public String getSignattendtime() {
        return signattendtime;
    }

    public void setSignattendtime(String signattendtime) {
        this.signattendtime = signattendtime == null ? null : signattendtime.trim();
    }

    public String getSignovertime() {
        return signovertime;
    }

    public void setSignovertime(String signovertime) {
        this.signovertime = signovertime == null ? null : signovertime.trim();
    }

    public String getSignlocation() {
        return signlocation;
    }

    public void setSignlocation(String signlocation) {
        this.signlocation = signlocation == null ? null : signlocation.trim();
    }

    public Integer getSigncount() {
        return signcount;
    }

    public void setSigncount(Integer signcount) {
        this.signcount = signcount;
    }

    public Integer getSignstate() {
        return signstate;
    }

    public void setSignstate(Integer signstate) {
        this.signstate = signstate;
    }

    public Class getClasses() {
        return classes;
    }

    public void setClasses(Class classes) {
        this.classes = classes;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Integer getIfSign() {
        return ifSign;
    }

    public void setIfSign(Integer ifSign) {
        this.ifSign = ifSign;
    }

    public String getOversignlocation() {
        return oversignlocation;
    }

    public void setOversignlocation(String oversignlocation) {
        this.oversignlocation = oversignlocation;
    }
}