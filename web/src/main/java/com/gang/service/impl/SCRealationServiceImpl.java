package com.gang.service.impl;


import com.gang.dao.ClassMapper;
import com.gang.dao.SCRealationMapper;
import com.gang.pojo.Class;
import com.gang.pojo.SCRealation;
import com.gang.service.ISCRealationService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.InputSourceEditor;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.Sides;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by 吕港 on 2017/11/10.
 */
@Service("ISCRealationService")
public class SCRealationServiceImpl implements ISCRealationService {

    @Autowired
    private SCRealationMapper scRealation;

    @Autowired
    private ClassMapper classes;

    @Override
    public JSONArray findClassByStuId(int id) {
        List<Class> classes=scRealation.selectByStuId(id);
        JSONArray judge=new JSONArray(classes);
        return judge;
    }

    @Override
    public JSONArray findStudentsByClaId(int CId,int TId) {
        List<SCRealation> students=scRealation.selectByClaId(CId,TId);
        JSONArray judge=new JSONArray(students);
        return judge;
    }

    @Override
    public JSONObject findBaseAll(HttpServletRequest request) {
        JSONObject judge;
        int CId=Integer.parseInt(request.getParameter("CId"));
        int SId=Integer.parseInt(request.getParameter("SId"));
        int SignCount=Integer.parseInt(request.getParameter("countSign"));
        SCRealation scRealation1=scRealation.selectBaseAll(CId,SId,SignCount);
        if(scRealation1==null){
            String msg="{'state':0}";
            judge=new JSONObject(msg);
        }else {
            judge=new JSONObject(scRealation1);
        }
        return judge;
    }

    @Override
    public JSONObject findBaseOverAll(HttpServletRequest request) {
        JSONObject judge;
        int CId=Integer.parseInt(request.getParameter("CId"));
        int SId=Integer.parseInt(request.getParameter("SId"));
        int SignCount=Integer.parseInt(request.getParameter("countSign"));
        SCRealation scRealation1=scRealation.selectBaseAll(CId,SId,SignCount);
        if(scRealation1.getIfSign() == null){
            String msg="{'state':2}";
            judge=new JSONObject(msg);
        }else if(scRealation1==null || scRealation1.getIfSign()<1){
            String msg="{'state':0}";
            judge=new JSONObject(msg);
        }else if(scRealation1.getOversignlocation()==null || scRealation1.getOversignlocation().trim().equals("")){
            String msg="{'state':1}";
            judge=new JSONObject(msg);
        }else{
            judge=new JSONObject(scRealation1);
        }
        return judge;
    }

    @Override
    public JSONObject insertSCR(HttpServletRequest request) {
        int CId=Integer.parseInt(request.getParameter("CId"));
        int SId= Integer.parseInt(request.getParameter("SId"));
        int countSign=Integer.parseInt(request.getParameter("countSign"));
        String signLocation=request.getParameter("signLocation");
        String currentTime=request.getParameter("currentTime");
        Long current=Long.parseLong(currentTime);

        Long attendTime = null;
        Class aclass=classes.selectClassByCId(CId);
        String classAttendTime=aclass.getAttendtime();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        try {
            date = format.parse(classAttendTime);
            attendTime=Long.parseLong(String.valueOf(date.getTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Long diffTime=(current-attendTime)/1000;

        SCRealation scRealation1=new SCRealation(SId,CId,"1","1",signLocation,countSign);
        SCRealation scRealation2=scRealation.selectBaseAll(CId,SId,countSign);
        String msg="";

        if(diffTime>7200){
            msg="{'status':0}";
        }else{
            if(scRealation2==null){
                scRealation.insertSelective(scRealation1);
                msg="{'status':1,'msg':"+'"'+"同学，成功定位到你现在的位置了哦！快去继续完成上课签到吧！"+'"'+'}';
            }else{
                scRealation.updateByCSSignCount(scRealation1);
                msg="{'status':1,'msg':"+'"'+"同学，成功修改你这次上课的定位位置了哦！快去继续完成上课签到吧！"+'"'+'}';
            }
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }


    @Override
    public JSONObject insertOverSCR(HttpServletRequest request) {
        int CId=Integer.parseInt(request.getParameter("CId"));
        int SId= Integer.parseInt(request.getParameter("SId"));
        int countSign=Integer.parseInt(request.getParameter("countSign"));
        String OverSignLocation=request.getParameter("OverSignLocation");
        String currentTime=request.getParameter("currentTime");
        Long current=Long.parseLong(currentTime);

        Long overTime = null;
        Class aclass=classes.selectClassByCId(CId);
        String classOttendTime=aclass.getOvertime();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        try {
            date = format.parse(classOttendTime);
            overTime=Long.parseLong(String.valueOf(date.getTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Long diffTime=(current-overTime)/1000;

        SCRealation scRealation1=new SCRealation(SId,CId,"1","1",countSign,OverSignLocation);
        SCRealation scRealation2=scRealation.selectBaseAll(CId,SId,countSign);
        String msg=null;

        String a=scRealation2.getOversignlocation();

        if(diffTime>7200){
            msg="{'status':0}";
        }else{
            if(scRealation2==null){
                msg="{'status':1,'msg':"+'"'+"同学，你还没有完成上课签到吧！"+'"'+'}';
            }else if(a==null || a.trim().equals("")){
                    scRealation.updateByCSSignCount(scRealation1);
                    msg="{'status':1,'msg':"+'"'+"同学，成功定位到你现在的位置了哦！快去继续完成下课签到吧！"+'"'+'}';
                }else{
                    scRealation.updateByCSSignCount(scRealation1);
                    msg="{'status':1,'msg':"+'"'+"同学，成功修改你这次上课的定位位置了哦！快去继续完成下课签到吧！"+'"'+'}';
                }
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }



    @Override
    public JSONObject updateSCR(HttpServletRequest request) {
        int SId= Integer.parseInt(request.getParameter("SId"));
        int CId=Integer.parseInt(request.getParameter("CId"));
        int countSign=Integer.parseInt(request.getParameter("countSign"));
        int SignState=Integer.parseInt(request.getParameter("SignState"));
        int IfSign=Integer.parseInt(request.getParameter("IfSign"));
        String ifAttend=request.getParameter("ifAttend");
        String msg=null;
        SCRealation scRealation1=new SCRealation(SId,CId,"1",countSign,SignState,IfSign);
        SCRealation scRealation2=scRealation.selectBaseAll(CId,SId,countSign);

        if(ifAttend.equals("true")){
            if(scRealation2.getIfSign()==null){
                scRealation.updateByCSSignCount(scRealation1);
                if(SignState==3){
                    msg="{'msg':'同学，你迟到了，下次来早点上课吧！耐心等到下课再来签到吧！'}";
                }else{
                    msg="{'msg':'同学，你按时来上课了哦！继续加油哦！耐心等到下课再来签到吧！'}";
                }

            }else if(scRealation2.getIfSign()>=1){
                msg="{'msg':'同学，你已经上课签到过了！别再点我了哦！'}";
            }else{
                msg="{'msg':'签到发生了未知错误！请重新签到吧！或者联系管理员和老师来解决！'}";
            }
        }else{
            if(scRealation2.getIfSign()==null){
                msg="{'msg':'同学，你还没上课签到吧！'}";
            }else{
                if(scRealation2.getIfSign()==1){
                    if(scRealation2.getSignstate()==2){
                        scRealation.updateByCSSignCount(scRealation1);
                        if(SignState==4){
                            msg="{'msg':'同学，你早退了，下次按时下课吧！（老师下课五分钟内你没签到下课我就算你早退，就是这么任性！）'}";
                        }else{
                            msg="{'msg':'同学，你按时来下课了哦！继续加油哦！'}";
                        }
                    }else{
                        SignState=scRealation2.getSignstate();
                        SCRealation scRealation3=new SCRealation(SId,CId,countSign,"1",SignState,IfSign);
                        scRealation.updateByCSSignCount(scRealation3);
                        msg="{'msg':'同学，你今天迟到了，下次早点来上课签到吧！'}";
                    }


                }else if(scRealation2.getIfSign()==2){
                    msg="{'msg':'同学，你已经下课签到过了！别再点我了哦！'}";
                }else{
                    msg="{'msg':'签到发生了未知错误！请重新签到吧！或者联系管理员和老师来解决！'}";
                }
            }
        }

        JSONObject judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONObject updateSignStatus(HttpServletRequest request) {
        int SId=Integer.parseInt(request.getParameter("SId"));
        int CId=Integer.parseInt(request.getParameter("CId"));
        int SignCount=Integer.parseInt(request.getParameter("SignCount"));
        int SignState=Integer.parseInt(request.getParameter("SignState"));
        SCRealation record=new SCRealation(SId,CId,SignCount,SignState);
        int i;

        SCRealation exist=scRealation.selectBaseAll(CId,SId,SignCount);
        if(exist==null || exist.getSignstate()==null){
            i=scRealation.insertSelective(record);
        }else{
            i=scRealation.updateByCSSignCount(record);
        }
        String msg="";
        if(i>=1){
            msg="{'status':0}";
        }else{
            msg="{'status':1}";
        }
        JSONObject judge=new JSONObject(msg);
        return judge;
    }


}
