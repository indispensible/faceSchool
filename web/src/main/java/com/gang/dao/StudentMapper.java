package com.gang.dao;

import com.gang.pojo.Student;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface StudentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Student record);

    int insertSelective(Student record);

    Student selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Student record);

    int updateByPrimaryKey(Student record);

    int updateByEmailSelective(Student record);

    String selectPictureByPrimaryKey(int id);

    Student selectByUsername(String username);

    Student selectByMhUsername(String mhUsername);

}