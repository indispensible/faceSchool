package com.gang.dao;

import com.gang.pojo.StudentsDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by 吕港 on 2017/11/22.
 */
public interface StudentsDetailMapper {
    List<StudentsDetail> findAllStudentsDetail(@Param("CId")int CId);
}
