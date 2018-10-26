package com.gang.service.impl;

import com.gang.dao.AdministratorMapper;
import com.gang.dao.TeacherMapper;
import com.gang.pojo.Administrator;
import com.gang.pojo.Teacher;
import com.gang.service.IAdministratorService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by 吕港 on 2017/11/25.
 */
@Service("IAdministratorService")
public class AdministratorServiceImpl implements IAdministratorService {

    @Autowired
    private AdministratorMapper administratorMapper;

    @Override
    public JSONObject login(HttpServletRequest request) {
        String username=request.getParameter("username");
        Administrator administrator=administratorMapper.selectByUsername(username);
        String msg="";
        if(administrator==null){
            msg="{'status':1}";
        }else{
            String password=request.getParameter("password");
            String realPassword=administrator.getPassword();
            int status=administrator.getStatus();
            int id=administrator.getId();
            if(password.equals(realPassword)){
                if(status==0){
                    msg="{'status':3}";
                }else if(status==1){
                    HttpSession session=request.getSession();
                    session.setAttribute("superAdministrator",username);
                    session.setAttribute("status",status);
                    session.setAttribute("AId",id);
                    msg="{'status':0,'degree':"+status+"}";
                }else{
                    HttpSession session=request.getSession();
                    session.setAttribute("ordinaryAdministrator",username);
                    session.setAttribute("status",status);
                    session.setAttribute("AId",id);
                    msg="{'status':0,'degree':"+status+"}";
                }
            }else{
                msg="{'status':2}";
            }
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONArray selectByPrimaryKeyAndHaveAuthority() {
        List<Administrator> administrators=administratorMapper.selectByPrimaryKeyAndHaveAuthority();
        JSONArray judge=new JSONArray(administrators);
        return judge;
    }

    @Override
    public JSONObject appendAdministrator(HttpServletRequest request) {
        SimpleDateFormat sdf=new SimpleDateFormat("yyMMddHHmmss");
        String username=sdf.format(new Date());
        String password="123456";
        String email=request.getParameter("email");
        String iphone=request.getParameter("iphone");
        String realname=request.getParameter("realname");
        int status=2;
        Administrator administrator=new Administrator(username,password,email,status,iphone,realname);
        int i=administratorMapper.insertSelective(administrator);
        String msg="";
        if(i>=1){
            msg="{'status':1,'username':"+username+",'password':"+password+"}";
        }else{
            msg="{'status':0}";
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONObject updateAdministratorPassword(HttpServletRequest request) {
        HttpSession session=request.getSession();
        Integer degree= (Integer) session.getAttribute("status");
        String username="";
        if(degree==1){
            username= (String) session.getAttribute("superAdministrator");
        }else{
            username= (String) session.getAttribute("ordinaryAdministrator");
        }
        String password=request.getParameter("password");
        Administrator administrator=new Administrator(username,password);
        int i=administratorMapper.updateByUsernameKeySelective(administrator);
        String msg="";
        if(i>=1){
            msg="{'msg':'修改成功'}";
        }else{
            msg="{'msg':'修改失败,请刷新页面后再重试!'}";
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONObject deleteAdministrator(HttpServletRequest request) {
        int AId=Integer.parseInt(request.getParameter("AId"));
        int status=Integer.parseInt(request.getParameter("status"));
        Administrator administrator=new Administrator(AId,status);
        int i=administratorMapper.updateByPrimaryKeySelective(administrator);
        String msg="";
        if(i>=0){
            msg="{'msg':'删除其权限成功！'}";
        }else{
            msg="{'msg':'发生未知错误，请刷新页面后重试此功能！'}";
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONObject selectAdministrator(HttpServletRequest request) {
        HttpSession session=request.getSession();
        Integer degree= (Integer) session.getAttribute("status");
        String username=null;
        JSONObject judge;
        if(degree==1){
            username= (String) session.getAttribute("superAdministrator");
        }else{
            username= (String) session.getAttribute("ordinaryAdministrator");
        }
        Administrator administrator=administratorMapper.selectByUsername(username);
        String msg="";
        if(administrator!=null){
            judge=new JSONObject(administrator);
        }else{
            msg="{'msg':'修改失败,请刷新页面后再重试!'}";
            judge=new JSONObject(msg);
        }
        return judge;
    }
}
