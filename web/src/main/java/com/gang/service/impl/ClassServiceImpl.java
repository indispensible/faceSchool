package com.gang.service.impl;

import com.gang.dao.ClassMapper;
import com.gang.pojo.Class;
import com.gang.service.IClassService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Created by 吕港 on 2017/11/9.
 */
@Service("IClassService")
public class ClassServiceImpl implements IClassService {

    @Autowired
    private ClassMapper classMapper;

    @Override
    public JSONObject findClassById(HttpServletRequest request, HttpServletResponse response) {
        Class classes = classMapper.selectClassByCId(Integer.parseInt(request.getParameter("para")));
        JSONObject judge;
        if(classes==null){
            String msg="{'classes':0}";
            judge=new JSONObject(msg);
        }else{
            judge=new JSONObject(classes);
        }
        return judge;
    }

    @Override
    public JSONArray findClassByCName(HttpServletRequest request, HttpServletResponse response) {
        List<Class> classes = classMapper.selectClassByCName(request.getParameter("para"));
        JSONArray judge=new JSONArray(classes);
        return judge;
    }

    @Override
    public JSONArray findClassByTId(HttpServletRequest request) {
        List<Class> classes=classMapper.selectClassByTId(Integer.parseInt(request.getParameter("TId")));
        JSONArray judge=new JSONArray(classes);
        return judge;
    }

    @Override
    public JSONObject insertClass(HttpServletRequest request) {
        Class classes=new Class(Integer.parseInt(request.getParameter("TId")),request.getParameter("CName"),request.getParameter("CDescription"),"1","1","1",0);
        int i=classMapper.insertSelective(classes);
        String msg;
        if(i>=0){
            msg="{'msg':'添加成功'}";
        }else{
            msg="{'msg':'添加失败'}";
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONObject deleteClass(HttpServletRequest request) {
        int TId=Integer.parseInt(request.getParameter("TId"));
        int CId=Integer.parseInt(request.getParameter("CId"));
        int i=classMapper.deleteByCId(CId,TId);
        String msg;
        if(1>=1){
            msg="{'msg':'删除成功！'}";
        }else {
            msg="{'msg':'删除失败！'}";
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONObject getClass(HttpServletRequest request) {
        int CId= Integer.parseInt(request.getParameter("CId"));
        Class classes=classMapper.selectClassByCId(CId);
        JSONObject judge;
        if(classes==null){
            String msg="{'status':0}";
            judge=new JSONObject(msg);
        }else{
            judge=new JSONObject(classes);
        }
        return judge;
    }

    @Override
    public JSONObject updateClass(HttpServletRequest request) {
        int CId=Integer.parseInt(request.getParameter("CId"));
        int countSign=Integer.parseInt(request.getParameter("countSign"));
        String SignLocation=request.getParameter("SignLocation");
        Class aclass=new Class(CId,countSign,"1",SignLocation);
        Class classes=classMapper.selectClassByCId(CId);
        String msg="";

        Long attendTime = null;
        Long overTime=null;
        String classAttendTime=classes.getAttendtime();
        String classOverTime=classes.getOvertime();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        try {
            date = format.parse(classAttendTime);
            attendTime=Long.parseLong(String.valueOf(date.getTime()));
            date = format.parse(classOverTime);
            overTime=Long.parseLong(String.valueOf(date.getTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        int sign=countSign-1;

        if(attendTime>overTime){
            msg="{'msg':'请先完成第"+sign+"次下课，再来进行第"+(sign+1)+"次上课！'}";
        }else{
            int i=classMapper.updateByPrimaryKeySelective(aclass);
            if(i>=1){
                msg="{'status':1,'msg':'现在开始上课了！请告知学生们及时签到！'}";
            }else{
                msg="{'msg':'上课失败，请重新尝试！'}";
            }
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONObject updateOverClass(HttpServletRequest request) {
        int CId=Integer.parseInt(request.getParameter("CId"));
        String  SignLocation=request.getParameter("SignLocation");
        Class aClass=new Class(CId,"1",SignLocation);
        int i=classMapper.updateByPrimaryKeySelective(aClass);
        String msg="";
        if(i>=0){
            msg="{'msg':'现在开始下课了！请告知学生们及时签到！'}";
        }else {
            msg="{'msg':'下课失败，请重新尝试！'}";
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONObject signLocation(HttpServletRequest request) {
        int CId=Integer.parseInt(request.getParameter("CId"));
        String  SignLocation=request.getParameter("SignLocation");
        int status=Integer.parseInt(request.getParameter("status"));
        String msg="";
        if(status==0){
            int countSign,sign = 0;
            Class classes=classMapper.selectClassByCId(CId);
            if(classes.getCountsign().equals(null)){
                countSign=1;
            }else {
                countSign=classes.getCountsign()+1;
            }
            Class aclass=new Class(CId,countSign,"1",SignLocation);

            Long attendTime = null;
            Long overTime=null;
            String classAttendTime=classes.getAttendtime();
            String classOverTime=classes.getOvertime();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = null;
            try {
                date = format.parse(classAttendTime);
                sign=countSign-1;
                attendTime=Long.parseLong(String.valueOf(date.getTime()));
                date = format.parse(classOverTime);
                overTime=Long.parseLong(String.valueOf(date.getTime()));
            } catch (ParseException e) {
                e.printStackTrace();
            }

            if(attendTime>overTime){
                msg="{'msg':'请先完成第"+sign+"次下课，再来进行第"+(sign+1)+"次上课！'}";
            }else{
                int num=classMapper.updateByPrimaryKeySelective(aclass);
                if(num>=1){
                    msg="{'status':1,'msg':'现在开始上课了！请告知学生们及时签到！'}";
                }else{
                    msg="{'msg':'上课失败，请刷新页面重新尝试！'}";
                }
            }
        }else if(status==1){

            Class bClass=new Class(CId,"1",SignLocation);
            int a=classMapper.updateByPrimaryKeySelective(bClass);
            if(a>=0){
                msg="{'msg':'现在开始下课了！请告知学生们及时签到！'}";
            }else {
                msg="{'msg':'下课失败，请刷新页面重新尝试！'}";
            }

        }else{
            msg="{'msg':'无法进行课程内容，请查看域名是否输入正确！'}";
        }

        JSONObject judge=new JSONObject(msg);
        return judge;
    }
}
