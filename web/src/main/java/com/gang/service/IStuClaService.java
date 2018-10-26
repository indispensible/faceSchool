package com.gang.service;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by 吕港 on 2017/11/12.
 */
public interface IStuClaService {
    JSONObject deleteClass(HttpServletRequest request);
    JSONArray findClassesOfStu(int SId);
    JSONArray findEnsureClass(int CId,int SId);
    JSONObject insertClassForStudent(HttpServletRequest request);
    JSONArray findAllStudentsOfClassByCId(HttpServletRequest request);
    JSONArray findStudentsDetail(HttpServletRequest request);
    JSONArray findAllStudentsAllDetailCount(HttpServletRequest request);
    JSONArray getAllStudentsDetail(HttpServletRequest request);
}
