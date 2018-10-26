package com.gang.dao;

import com.gang.pojo.Comment;

import java.util.List;

public interface CommentMapper {
    int deleteByPrimaryKey(Integer commentid);

    int insert(Comment record);

    int insertSelective(Comment record);

    Comment selectByPrimaryKey(Integer commentid);

    int updateByPrimaryKeySelective(Comment record);

    int updateByPrimaryKeyWithBLOBs(Comment record);

//    int updateByPrimaryKey(Comment record);

    List<Comment> selectByCId(Integer cid);
//
    List<Comment> selectByapplaud(Integer applaud);

}