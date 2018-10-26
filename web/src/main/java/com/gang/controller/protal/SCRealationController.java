package com.gang.controller.protal;

import com.gang.service.ISCRealationService;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by 吕港 on 2017/11/10.
 */
@Controller
@RequestMapping(value = "/SCFind/")
public class SCRealationController {
    @Resource(name="ISCRealationService")
    private ISCRealationService iscRealationService;

    @RequestMapping(value="classesBySId.do",method= RequestMethod.POST)
    public void classesBySId(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONArray judge=iscRealationService.findClassByStuId(3);
        out.print(judge);
    }

    @RequestMapping(value="studentsById.do",method=RequestMethod.POST)
    public void studentsById(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONArray judge=iscRealationService.findStudentsByClaId(1,1);
        out.print(judge);
    }

    @RequestMapping(value="SCR.do",method = RequestMethod.POST)
    public void SCR(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iscRealationService.findBaseAll(request);
        out.print(judge);
    }

    @RequestMapping(value="SCROver.do",method = RequestMethod.POST)
    public void SCROver(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iscRealationService.findBaseOverAll(request);
        out.print(judge);
    }

    @RequestMapping(value="signLocation.do",method=RequestMethod.POST)
    public void signLocation(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iscRealationService.insertSCR(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value="attendUltimately.do",method = RequestMethod.POST)
    public void attendUltimately(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iscRealationService.updateSCR(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value="OverSignLocation.do",method=RequestMethod.POST)
    public void OverSignLocation(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iscRealationService.insertOverSCR(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value="overUltimately.do",method = RequestMethod.POST)
    public void overUltimately(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iscRealationService.updateSCR(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "updateStatus",method = RequestMethod.POST)
    public void updateStatus(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iscRealationService.updateSignStatus(request);
        out.print(judge);
        out.flush();
    }
}
