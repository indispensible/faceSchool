package com.gang.service;

import com.gang.pojo.Teacher;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by 吕港 on 2017/11/20.
 */
public interface ITeacherService {
    JSONObject findTeacherByTeacherId(String username, String password);
    String insertTeacher(HttpServletRequest request);
    JSONArray queryTeacherCommon(HttpServletRequest request);
    JSONObject updateTeacherCommon(HttpServletRequest request);
    Teacher findTeacher(HttpServletRequest request);
    String updatePassword(HttpServletRequest request);
    Teacher findTeacherByEmail(String username);
    String updateProfile(HttpServletRequest request);
    String updateClass(HttpServletRequest request);
}
