package com.gang.dao;

import com.gang.pojo.Course;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CourseMapper {
    int insert(Course record);

    int insertSelective(Course record);

    List<Course> findAllCourses(@Param("username")String username);
}