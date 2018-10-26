package com.gang.pojo;

import java.util.Date;
import java.util.List;

public class Class {
    private Integer cid;

    private Integer tid;

    private String cname;

    private String cdescription;

    private String createtime;

    private String attendtime;

    private String overtime;

    private List<Class> classList;

    private String signlocation;

    private Integer countsign;

    private Teacher teacher;

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Integer getCountsign() {
        return countsign;
    }

    public void setCountsign(Integer countsign) {
        this.countsign = countsign;
    }

    public List<Class> getClassList() {
        return classList;
    }

    public void setClassList(List<Class> classList) {
        this.classList = classList;
    }


    public Class(Integer cid, Integer tid, String cname, String cdescription, String createtime, String attendtime, String overtime,Integer countsign,Teacher teacher) {
        this.cid = cid;
        this.tid = tid;
        this.cname = cname;
        this.cdescription = cdescription;
        this.createtime = createtime;
        this.attendtime = attendtime;
        this.overtime = overtime;
        this.countsign = countsign;
        this.teacher=teacher;
    }

    public Class(Integer tid, String cname, String cdescription, String createtime,Integer countsign) {
        this.tid = tid;
        this.cname = cname;
        this.cdescription = cdescription;
        this.createtime = createtime;
        this.countsign = countsign;
    }

    public Class(Integer tid, String cname, String cdescription, String createtime, String attendtime, String overtime,Integer countsign) {
        this.tid = tid;
        this.cname = cname;
        this.cdescription = cdescription;
        this.createtime = createtime;
        this.attendtime = attendtime;
        this.overtime = overtime;
        this.countsign = countsign;
    }

    public Class(Integer cid,Integer countsign, String attendtime,String signlocation) {
        this.cid = cid;
        this.attendtime = attendtime;
        this.countsign = countsign;
        this.signlocation=signlocation;
    }

    public Class(Integer cid, String overtime,String signlocation) {
        this.cid = cid;
        this.overtime = overtime;
        this.signlocation=signlocation;
    }

    public Class( String cname,String cdescription, Integer cid){
        this.cid = cid;
        this.cname = cname;
        this.cdescription = cdescription;
    }

    public Class() {
        super();
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public Integer getTid() {
        return tid;
    }

    public void setTid(Integer tid) {
        this.tid = tid;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname == null ? null : cname.trim();
    }

    public String getCdescription() {
        return cdescription;
    }

    public void setCdescription(String cdescription) {
        this.cdescription = cdescription == null ? null : cdescription.trim();
    }

    public String getCreatetime() {
        return createtime;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }

    public String getAttendtime() {
        return attendtime;
    }

    public void setAttendtime(String attendtime) {
        this.attendtime = attendtime == null ? null : attendtime.trim();
    }

    public String getOvertime() {
        return overtime;
    }

    public void setOvertime(String overtime) {
        this.overtime = overtime == null ? null : overtime.trim();
    }

    public String getSignlocation() {
        return signlocation;
    }

    public void setSignlocation(String signlocation) {
        this.signlocation = signlocation;
    }
}