package com.gang.pojo;

import java.util.Date;

public class Comment {
    private Integer commentid;

    private Integer cid;

    private String name;

    private String email;

    private Integer ifdelete;

    private Date time;

    private Integer applaud;

    private String comment;

    private String positive;

    private String sentiment;

    private String backup;

    public Comment(Integer commentid, Integer cid, String name, String email, Integer ifdelete, Date time, Integer applaud, String comment, String positive, String sentiment, String backup) {
        this.commentid = commentid;
        this.cid = cid;
        this.name = name;
        this.email = email;
        this.ifdelete = ifdelete;
        this.time = time;
        this.applaud = applaud;
        this.comment = comment;
        this.positive = positive;
        this.sentiment = sentiment;
        this.backup = backup;
    }

    public Comment(Integer cid, String name, String email, Integer ifdelete, Date time, Integer applaud, String comment, String positive, String sentiment, String backup) {
        this.cid = cid;
        this.name = name;
        this.email = email;
        this.ifdelete = ifdelete;
        this.time = time;
        this.applaud = applaud;
        this.comment = comment;
        this.positive = positive;
        this.sentiment = sentiment;
        this.backup = backup;
    }

    public Comment(Integer commentid, Integer cid, String name, String email, Integer ifdelete, Date time, Integer applaud, String comment) {
        this.commentid = commentid;
        this.cid = cid;
        this.name = name;
        this.email = email;
        this.ifdelete = ifdelete;
        this.time = time;
        this.applaud = applaud;
        this.comment = comment;
    }

    public Comment(Integer cid, String name, String email, Integer ifdelete, Date time, Integer applaud, String comment) {
        this.cid = cid;
        this.name = name;
        this.email = email;
        this.ifdelete = ifdelete;
        this.time = time;
        this.applaud = applaud;
        this.comment = comment;
    }

    public Comment() {
        super();
    }

    public Integer getCommentid() {
        return commentid;
    }

    public void setCommentid(Integer commentid) {
        this.commentid = commentid;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public Integer getIfdelete() {
        return ifdelete;
    }

    public void setIfdelete(Integer ifdelete) {
        this.ifdelete = ifdelete;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public Integer getApplaud() {
        return applaud;
    }

    public void setApplaud(Integer applaud) {
        this.applaud = applaud;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment == null ? null : comment.trim();
    }

    public String getPositive() {
        return positive;
    }

    public void setPositive(String positive) {
        this.positive = positive;
    }

    public String getSentiment() {
        return sentiment;
    }

    public void setSentiment(String sentiment) {
        this.sentiment = sentiment;
    }

    public String getBackup() {
        return backup;
    }

    public void setBackup(String backup) {
        this.backup = backup;
    }
}