package com.gang.service;

import com.gang.pojo.SCRealation;
import org.apache.ibatis.annotations.Param;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by 吕港 on 2017/11/10.
 */
public interface ISCRealationService {
    JSONArray findClassByStuId(int id);
    JSONArray findStudentsByClaId(int CId,int TId);
    JSONObject findBaseAll(HttpServletRequest request);
    JSONObject findBaseOverAll(HttpServletRequest request);
    JSONObject insertSCR(HttpServletRequest request);
    JSONObject insertOverSCR(HttpServletRequest request);
    JSONObject updateSCR(HttpServletRequest request);
    JSONObject updateSignStatus(HttpServletRequest request);
}
