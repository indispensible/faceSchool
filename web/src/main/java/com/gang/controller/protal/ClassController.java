package com.gang.controller.protal;

import com.gang.service.impl.ClassServiceImpl;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by 吕港 on 2017/11/9.
 */
@Controller
@RequestMapping("/find/")
public class ClassController {
    @Resource(name="IClassService")
    private ClassServiceImpl iClassService;

    @RequestMapping(value="class.do",method= RequestMethod.POST)
    public void classes(HttpServletRequest request, HttpServletResponse response) throws IOException {

        PrintWriter out=response.getWriter();
        if(request.getParameter("isString").equals("true")){
            JSONArray judge=iClassService.findClassByCName(request,response);
            out.print(judge);
        }else{
            JSONObject judge=iClassService.findClassById(request,response);
            out.print(judge);
        }

    }

    @RequestMapping(value = "classesByTId",method = RequestMethod.POST)
    public void classesByTId(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONArray judge=iClassService.findClassByTId(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "insertClasses.do",method = RequestMethod.POST)
    public void insertClasses(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iClassService.insertClass(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "deleteClass.do",method = RequestMethod.POST)
    public void deleteClass(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iClassService.deleteClass(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "getClass.do",method = RequestMethod.POST)
    public void getClass(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iClassService.getClass(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "updateClass.do",method = RequestMethod.POST)
    public void updateClass(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iClassService.updateClass(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "updateOverClass.do",method = RequestMethod.POST)
    public void updateOverClass(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iClassService.updateOverClass(request);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "signLocation.do",method = RequestMethod.POST)
    public void signLocation(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        JSONObject judge=iClassService.signLocation(request);
        out.print(judge);
        out.flush();
    }
}
