package com.gang.service;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by 吕港 on 2018/3/14.
 */
public interface ICommentService {
    JSONArray getComments(HttpServletRequest request);
    JSONArray getCommentsBytest(HttpServletRequest request);
    JSONObject getCommentsByCommentId(HttpServletRequest request);
    JSONArray getCommentsByApplaud(HttpServletRequest request);
    JSONObject createComments(HttpServletRequest request);
    JSONObject deleteComments(HttpServletRequest request);
}
