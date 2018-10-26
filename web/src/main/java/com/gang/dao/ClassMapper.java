package com.gang.dao;

import com.gang.pojo.Class;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ClassMapper {
    int insert(Class record);

    int insertSelective(Class record);

    List<Class> selectClassByCName(String name);

    Class selectClassByCId(int CId);

    List<Class> selectClassByTId(int TId);

    int deleteByCId(@Param("CId") Integer CId,@Param("TId") Integer TId);

    int updateByPrimaryKeySelective(Class record);
}