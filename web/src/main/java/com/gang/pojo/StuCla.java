package com.gang.pojo;

import java.util.List;

public class StuCla {
    private Integer sid;

    private Integer cid;

    private String createtime;

    private String attendTime;

    private String overtime;

    private Integer signcount;

    private Integer signstate;

    private Student student;

    private Teacher teacher;

    private Class classes;

    private List<SCRealation> scRealation;

    public StuCla(Integer sid, Integer cid, String createtime, Teacher teacher, Class classes, Student student) {
        this.sid = sid;
        this.cid = cid;
        this.createtime = createtime;
        this.teacher=teacher;
        this.classes=classes;
        this.student=student;
    }

    public StuCla(Integer sid, Integer cid, String createtime) {
        this.sid = sid;
        this.cid = cid;
        this.createtime = createtime;

    }

    public StuCla() {
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

    public String getCreatetime() {
        return createtime;
    }

    public void setCreatetime(String createtime) {
        this.createtime = createtime;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
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

    public List<SCRealation> getScRealation() {
        return scRealation;
    }

    public void setScRealation(List<SCRealation> scRealation) {
        this.scRealation = scRealation;
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

    public String getOvertime() {
        return overtime;
    }

    public void setOvertime(String overtime) {
        this.overtime = overtime;
    }

    public String getAttendTime() {
        return attendTime;
    }

    public void setAttendTime(String attendTime) {
        this.attendTime = attendTime;
    }
}