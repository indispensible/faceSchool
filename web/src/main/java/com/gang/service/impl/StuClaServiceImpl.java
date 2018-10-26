package com.gang.service.impl;

import com.gang.dao.StuClaMapper;
import com.gang.dao.StudentsDetailMapper;
import com.gang.pojo.StuCla;
import com.gang.pojo.StudentsDetail;
import com.gang.service.IStuClaService;
import org.apache.ibatis.annotations.Param;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by 吕港 on 2017/11/12.
 */
@Service("IStuClaService")
public class StuClaServiceImpl implements IStuClaService {

    @Autowired
    private StuClaMapper stuClaMapper;

    @Autowired
    private StudentsDetailMapper studentsDetailMapper;

    @Override
    public JSONObject deleteClass(HttpServletRequest request) {
        int CId= Integer.parseInt(request.getParameter("CId"));
        int SId= Integer.parseInt(request.getParameter("SId"));
        stuClaMapper.deleteByCIdAndSId(CId,SId);
        String msg="{'msg':'成功删除！'}";
        JSONObject judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONArray findClassesOfStu(int SId) {
        List<StuCla> classes=stuClaMapper.findClassesOfStu(SId);
        JSONArray judge;
        if(classes==null){
            String msg="{'status':0}";
            judge = new JSONArray(msg);
        }else{
            judge=new JSONArray(classes);
        }
        return judge;
    }

    @Override
    public JSONArray findEnsureClass(int CId, int SId) {
        List<StuCla> stuCla=stuClaMapper.findEnsureClass(CId,SId);
        JSONArray judge=new JSONArray(stuCla);
        return judge;
    }

    @Override
    public JSONObject insertClassForStudent(HttpServletRequest request) {
        int CId= Integer.parseInt(request.getParameter("CId"));
        int SId= Integer.parseInt(request.getParameter("SId"));
        StuCla stuCla=stuClaMapper.findBaseAllClass(CId,SId);
        JSONObject judge=null;
        String msg="";
        if(stuCla==null){
            StuCla stuCla1=new StuCla(SId,CId,"1");
            stuClaMapper.insert(stuCla1);
            msg="{'status':1,'msg':'成功加入该课程了'}";
        }else{
            msg="{'status':0,'msg':'同学，你已经加入过了该课程!'}";
        }
        judge=new JSONObject(msg);
        return judge;
    }

    @Override
    public JSONArray findAllStudentsOfClassByCId(HttpServletRequest request) {
        int CId=Integer.parseInt(request.getParameter("CId"));
        List<StuCla> students=stuClaMapper.findAllStudentsOfClassByCId(CId);
        JSONArray judge=new JSONArray(students);
        JSONObject obj=new JSONObject();
        int i=judge.length();
        if(i==0){
            obj.put("status",0);
        }else{
            obj.put("status",1);
        }
        judge.put(obj);
        return judge;
    }

    @Override
    public JSONArray findStudentsDetail(HttpServletRequest request) {
        int CId=Integer.parseInt(request.getParameter("CId"));
        int countSign=Integer.parseInt(request.getParameter("countSign"));
        List<StuCla> studentsDetail=stuClaMapper.findStudentsDetail(CId,countSign);
        JSONArray judge=new JSONArray(studentsDetail);
        if(judge.length()==0){
            String msg="{'msg':'查询失败！'}";
            JSONObject obj=new JSONObject(msg);
            judge.put(obj);
        }
        return judge;
    }

    @Override
    public JSONArray findAllStudentsAllDetailCount(HttpServletRequest request) {
        int CId= Integer.parseInt(request.getParameter("CId"));
        List<StudentsDetail> studentsDetails=studentsDetailMapper.findAllStudentsDetail(CId);
        JSONArray judge=new JSONArray(studentsDetails);
        return judge;
    }

    @Override
    public JSONArray getAllStudentsDetail(HttpServletRequest request) {
        int CId = Integer.parseInt(request.getParameter("CId"));
        List<StuCla> stuClasses=stuClaMapper.findAllStudentsDetail(CId);
        JSONArray judge=new JSONArray(stuClasses);
        return judge;
    }
}
