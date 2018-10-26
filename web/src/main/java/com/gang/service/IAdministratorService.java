package com.gang.service;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by 吕港 on 2017/11/25.
 */
public interface IAdministratorService {
    JSONObject login(HttpServletRequest request);
    JSONArray  selectByPrimaryKeyAndHaveAuthority();
    JSONObject appendAdministrator(HttpServletRequest request);
    JSONObject updateAdministratorPassword(HttpServletRequest request);
    JSONObject deleteAdministrator(HttpServletRequest request);
    JSONObject selectAdministrator(HttpServletRequest request);
}
