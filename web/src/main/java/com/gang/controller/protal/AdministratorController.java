package com.gang.controller.protal;

import com.gang.service.impl.AdministratorServiceImpl;
import com.gang.service.impl.TeacherServiceImpl;
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
import java.io.PrintWriter;

/**
 * Created by 吕港 on 2017/11/25.
 */
@Controller
@RequestMapping(value = "/Administrator/")
public class AdministratorController {

    @Resource(name = "IAdministratorService")
    private AdministratorServiceImpl iAdministratorService;

    @Resource(name="ITeacherService")
    private TeacherServiceImpl iTeacherService;

    @RequestMapping(value = "login.do")
    public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iAdministratorService.login(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "queryAdministrator.do",method = RequestMethod.POST)
    public void queryAdministrator(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONArray judge=iAdministratorService.selectByPrimaryKeyAndHaveAuthority();
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "appendAdministrator.do",method = RequestMethod.POST)
    public void appendAdministrator(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iAdministratorService.appendAdministrator(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "updatePassword.do",method = RequestMethod.POST)
    public void updateAdministratorPassword(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iAdministratorService.updateAdministratorPassword(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "queryAllCheckPending.do",method = RequestMethod.POST)
    public void queryAllCheckPending(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONArray judge=iTeacherService.queryTeacherCommon(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "queryAllChecked.do",method = RequestMethod.POST)
    public void queryAllChecked(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONArray judge=iTeacherService.queryTeacherCommon(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "queryAllDeleted.do",method = RequestMethod.POST)
    public void queryAllDeleted(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONArray judge=iTeacherService.queryTeacherCommon(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "judgeCommon.do",method = RequestMethod.POST)
    public void judgeCommon(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iTeacherService.updateTeacherCommon(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "deleteAdministrator.do",method = RequestMethod.POST)
    public void deleteAdministrator(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iAdministratorService.deleteAdministrator(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "findAdministrator.do",method = RequestMethod.POST)
    public void findAdministrator(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iAdministratorService.selectAdministrator(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "signOut.do",method = RequestMethod.POST)
    public void signOut(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        int status=Integer.parseInt(request.getParameter("status"));
        if(status==1){
            HttpSession session=request.getSession();
            session.setAttribute("superAdministrator","");
            session.setAttribute("status","");
            session.setAttribute("AId","");
        }else{
            HttpSession session=request.getSession();
            session.setAttribute("ordinaryAdministrator","");
            session.setAttribute("status",status);
            session.setAttribute("AId","");
        }
        String msg="{'msg':'OK'}";
        JSONObject judge=new JSONObject(msg);
        out.print(judge);
        out.flush();
    }
}
