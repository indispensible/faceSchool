package com.gang.controller.protal;

import com.gang.common.ExcelWrite;
import com.gang.common.ResponseCode;
import com.gang.pojo.Student;
import com.gang.service.IStuClaService;
import com.gang.service.IStudentService;
import jxl.write.WriteException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;

/**
 * Created by 吕港 on 2017/11/12.
 */
@Controller
@RequestMapping(value = "/StuFind/")
public class StuClaController {
    @Resource(name = "IStuClaService")
    private IStuClaService iStuClaService;

    @Resource(name = "IStudentService")
    private IStudentService iStudentService;

    @RequestMapping(value = "getStuId.do",method = RequestMethod.POST)
    public void getStuId(HttpServletResponse response, HttpSession session) throws IOException {
        Student student=iStudentService.findStudent((String) session.getAttribute("studentUsername"));
        PrintWriter out=response.getWriter();
        JSONObject judge=new JSONObject(student);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "classes.do",method = RequestMethod.POST)
    public void classes(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws IOException {
        //获取使用者的学生ID号
        String userName = "";
        if(request.getParameter("username")==null){
            userName = (String) session.getAttribute("username");
        }else{
            userName = request.getParameter("username");
        }
        Student student=iStudentService.findStudent(userName);
        int SId=student.getId();
        JSONArray judge=iStuClaService.findClassesOfStu(SId);
        JSONObject add=new JSONObject();
        add.put("SId",SId);
        judge.put(add);
        PrintWriter out=response.getWriter();
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "findEnsureClass.do",method = RequestMethod.POST)
    public void findEnsureClass(HttpServletRequest request,HttpServletResponse response) throws IOException {
        int CId= Integer.parseInt(request.getParameter("CId"));
        int SId= Integer.parseInt(request.getParameter("SId"));
        //第一个参数时classID,第二个参数是studentID
        JSONArray judge=iStuClaService.findEnsureClass(CId,SId);
        PrintWriter out=response.getWriter();
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value="insertClassForStudent.do",method = RequestMethod.POST)
    public void insertClassForStudent(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iStuClaService.insertClassForStudent(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "deleteClass.do",method = RequestMethod.POST)
    public void deleteClass(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iStuClaService.deleteClass(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value="studentsByCId.do",method = RequestMethod.POST)
    public void studentsByCId(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONArray judge=iStuClaService.findAllStudentsOfClassByCId(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "studentsDetail.do",method = RequestMethod.POST)
    public void studentsDetail(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONArray judge=iStuClaService.findStudentsDetail(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "findStudentsDetail.do",method = RequestMethod.POST)
    public void findStudentsDetail(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONArray judge=iStuClaService.findAllStudentsAllDetailCount(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "printDetail.do",method = RequestMethod.POST)
    public void printDetail(HttpServletRequest request,HttpServletResponse response) throws IOException, WriteException {
        PrintWriter out=response.getWriter();
        JSONArray judge=iStuClaService.getAllStudentsDetail(request);
        out.print(judge);
        out.flush();
    }
}
