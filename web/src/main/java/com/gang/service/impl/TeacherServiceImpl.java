package com.gang.service.impl;

import com.gang.dao.ClassMapper;
import com.gang.dao.TeacherMapper;
import com.gang.pojo.Class;
import com.gang.pojo.Teacher;
import com.gang.service.ITeacherService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by 吕港 on 2017/11/20.
 */
@Service("ITeacherService")
public class TeacherServiceImpl implements ITeacherService {

    @Autowired
    private TeacherMapper teacherMapper;

    @Autowired
    private ClassMapper classMapper;

    @Override
    public JSONObject findTeacherByTeacherId(String username, String password) {
        String email=username;
        Teacher teacher=teacherMapper.selectByTeacherEmail(email);
        JSONObject judge = null;
        if(teacher == null){
            String msg = "{'status':3}";
            judge=new JSONObject(msg);
        }else{
            judge=new JSONObject(teacher);
            if(teacher.getStatus()==0){
                judge.put("status",4);
            }else{
                if(teacher==null){
                    judge.put("status",3);
                }else{
                    String realPassword=teacher.getPassword();
                    if(password.equals(realPassword)){
                        judge.put("status",1);
                    }else{
                        judge.put("status",2);
                    }
                }
            }
        }

        return judge;
    }

    @Override
    public String insertTeacher(HttpServletRequest request) {
        Teacher teacher = teacherMapper.selectByTeacherEmail(request.getParameter("email"));
        String msg;
        if(teacher == null){
            Teacher teacher1=new Teacher(request.getParameter("email"),request.getParameter("password"),request.getParameter("iphone"),request.getParameter("identification"),
                    request.getParameter("realname"),request.getParameter("username"),Integer.parseInt(request.getParameter("status")),Integer.parseInt(request.getParameter("ifDelete")));
            teacherMapper.insertSelective(teacher1);
            msg="{'status':0}";
        }else{
            msg="{'status':1}";
        }

        return msg;
    }


    @Override
    public JSONArray queryTeacherCommon(HttpServletRequest request) {
        int status =Integer.parseInt(request.getParameter("status"));
        int ifDelete=Integer.parseInt(request.getParameter("ifDelete"));
        JSONArray judge;
        if(status==0 && ifDelete==0){
            List<Teacher> teachers=teacherMapper.selectPendingByStatusAndIfDelete(status,ifDelete);
            judge=new JSONArray(teachers);
        }else if(status==1 && ifDelete==0){
            List<Teacher> teachers=teacherMapper.selectAdoptByStatusAndIfDelete(status,ifDelete);
            judge=new JSONArray(teachers);
        }else if(status==0 && ifDelete==1){
            List<Teacher> teachers=teacherMapper.selectDeleteByStatusAndIfDelete(status,ifDelete);
            judge=new JSONArray(teachers);
        }else{
            judge=new JSONArray();
            String msg="{'status':1}";
            JSONObject error=new JSONObject(msg);
            judge.put(error);
        }
        return judge;
    }

    @Override
    public JSONObject updateTeacherCommon(HttpServletRequest request) {
        int agree=Integer.parseInt(request.getParameter("agree"));
        int TId=Integer.parseInt(request.getParameter("TId"));
        int status=Integer.parseInt(request.getParameter("status"));
        int ifDelete=Integer.parseInt(request.getParameter("ifDelete"));
        HttpSession session=request.getSession();
        int AId= (int) session.getAttribute("AId");
        String msg="";
        if(agree==1){
            Teacher teacher=new Teacher(TId,status,ifDelete,AId);
            int i=teacherMapper.updateByPrimaryKeySelective(teacher);
            if(i>=0){
                msg="{'msg':'该老师已获得成为老师的权限！'}";
            }else{
                msg="{'msg':'发生未知错误，请重新刷新页面再来应用此功能！'}";
            }
        }else if(agree==0){
            Teacher teacher=new Teacher(TId,status,"又一个被更改的老师！",ifDelete,AId);
            int i=teacherMapper.updateByPrimaryKeySelective(teacher);
            if(i>=0){
                msg="{'msg':'该老师已失去老师的权限！'}";
            }else{
                msg="{'msg':'发生未知错误，请重新刷新页面再来应用此功能！'}";
            }
        }else {
            msg="{'msg':'发生未知错误，请重新刷新页面再来应用此功能！'}";
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public Teacher findTeacher(HttpServletRequest request) {
        String email = request.getParameter("email");
        Teacher teacher = teacherMapper.selectByTeacherEmail(email);
        return teacher;
    }

    @Override
    public String updatePassword(HttpServletRequest request) {
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        Teacher teacher = new Teacher(email, password);
        int judge = teacherMapper.updateByEamil(teacher);
        String msg = "";
        if(judge > 0){
            msg = "{'status':1}";
        }else{
            msg = "{'status':3}";
        }
        return msg;
    }

    @Override
    public Teacher findTeacherByEmail(String username) {
        Teacher teacher = teacherMapper.selectByTeacherEmail(username);
        return teacher;
    }

    @Override
    public String updateProfile(HttpServletRequest request) {
        String email = request.getParameter("email");
        String iphone = request.getParameter("iphone");
        String realname = request.getParameter("realname");
        Teacher teacher = new Teacher(email, iphone, realname);
        int judge = teacherMapper.updateByEamil(teacher);
        String msg = "";
        if(judge > 0){
            msg = "{'status':1}";
        }else{
            msg = "{'status':2}";
        }
        return msg;
    }

    @Override
    public String updateClass(HttpServletRequest request) {
        Integer cid = Integer.parseInt(request.getParameter("cid"));
        String cdescription = request.getParameter("cdescription");
        String cname = request.getParameter("cname");
        Class updateClass = new Class(cname, cdescription, cid);
        int judge = classMapper.updateByPrimaryKeySelective(updateClass);
        String msg = "";
        if(judge > 0){
            msg = "{'status':1}";
        }else{
            msg = "{'status':2}";
        }
        return msg;
    }


}
