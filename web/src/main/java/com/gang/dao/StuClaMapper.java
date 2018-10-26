package com.gang.dao;

import com.gang.pojo.StuCla;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface StuClaMapper {
    int deleteByCIdAndSId(@Param("CId")int CId,@Param("SId")int SId);

    int insert(StuCla record);

    int insertSelective(StuCla record);

    List<StuCla> findClassesOfStu(@Param("SId")int SId);

    List<StuCla> findEnsureClass(@Param("CId")int CId,@Param("SId")int SId);

    StuCla findBaseAllClass(@Param("CId")int CId,@Param("SId")int SId);

    List<StuCla> findAllStudentsOfClassByCId(Integer CId);

    List<StuCla> findStudentsDetail(@Param("CId")int CId,@Param("SignCount")int SignCount);

    List<StuCla> findAllStudentsDetail(@Param("CId")int CId);
}