package com.gang.service;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by 吕港 on 2017/11/9.
 */
public interface IClassService {
    JSONObject findClassById(HttpServletRequest request, HttpServletResponse response);

    JSONArray findClassByCName(HttpServletRequest request, HttpServletResponse response);

    JSONArray findClassByTId(HttpServletRequest request);

    JSONObject insertClass(HttpServletRequest request);

    JSONObject deleteClass(HttpServletRequest request);

    JSONObject getClass(HttpServletRequest request);

    JSONObject updateClass(HttpServletRequest request);

    JSONObject updateOverClass(HttpServletRequest request);

    JSONObject signLocation(HttpServletRequest request);
}
