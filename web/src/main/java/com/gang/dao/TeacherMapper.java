package com.gang.dao;

import com.gang.pojo.Administrator;
import com.gang.pojo.Teacher;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TeacherMapper {
    int deleteByPrimaryKey(Integer tid);

    int insert(Teacher record);

    int insertSelective(Teacher record);

    Teacher selectByPrimaryKey(Integer tid);

    int updateByPrimaryKeySelective(Teacher record);

    int updateByEamil(Teacher record);

    int updateByPrimaryKey(Teacher record);

    Teacher selectByTeacherEmail(@Param("email")String email);

    List<Teacher> selectAdoptByStatusAndIfDelete(@Param("status")int status, @Param("ifDelete")int ifDelete);

    List<Teacher> selectDeleteByStatusAndIfDelete(@Param("status")int status, @Param("ifDelete")int ifDelete);

    List<Teacher> selectPendingByStatusAndIfDelete(@Param("status")int status, @Param("ifDelete")int ifDelete);
}