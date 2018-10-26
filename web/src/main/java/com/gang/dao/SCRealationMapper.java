package com.gang.dao;

import com.gang.pojo.Class;
import com.gang.pojo.SCRealation;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SCRealationMapper {
    int insert(SCRealation record);

    int insertSelective(SCRealation record);

    List<Class> selectByStuId(int id);

    List<SCRealation> selectByClaId(@Param("CId")int CId, @Param("TId")int TId);

    SCRealation selectBaseAll(@Param("CId")int CId,@Param("SId")int SId,@Param("SignCount")int SignCount);

    int updateByCSSignCount(SCRealation record);

    int updateByPrimaryKey(SCRealation record);
}