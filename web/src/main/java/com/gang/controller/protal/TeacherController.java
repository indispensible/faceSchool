package com.gang.controller.protal;

import com.gang.pojo.Teacher;
import com.gang.service.ITeacherService;
import com.gang.service.impl.TeacherServiceImpl;
import org.apache.commons.io.FilenameUtils;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by 吕港 on 2017/11/20.
 */
@Controller
@RequestMapping(value = "/Teacher/")
public class TeacherController {

    @Resource(name="ITeacherService")
    private TeacherServiceImpl iTeacherService;

    @RequestMapping(value = "login.do",method = RequestMethod.POST)
    public void login(HttpServletRequest request, HttpServletResponse response,HttpSession session) throws IOException {
//        String inputCode=request.getParameter("identify");
//        String realCode=(String) session.getAttribute('"'+request.getParameter("username")+ '"');
        session.setAttribute("teacherUsername",request.getParameter("username"));
        JSONObject judge=null;
        PrintWriter out=response.getWriter();

//        if(realCode==null){
//            judge.put("status",3);
//        }else{
//            if(Integer.parseInt(inputCode)==Integer.parseInt(realCode)){
                judge=iTeacherService.findTeacherByTeacherId(request.getParameter("username"),request.getParameter("password"));
//            }else{
//                judge.put("status",3);
//            }
//        }
        out.print(judge);
    }

    @RequestMapping(value = "uploadPic.do",method = RequestMethod.POST)
    public void uploadPic(MultipartFile pic, HttpServletRequest request, HttpServletResponse response) throws IllegalStateException, IOException {

        try {
            // 获取图片原始文件名
            String originalFilename = pic.getOriginalFilename();
//            System.out.println(originalFilename);

            // 文件名使用当前时间
            SimpleDateFormat a=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String date=a.format(new Date());
            String year=date.substring(0,4);
            String month=date.substring(5,7);
            String day=date.substring(8,10);


            // 获取上传图片的扩展名(jpg/png/...)
            String extension = FilenameUtils.getExtension(originalFilename);

//            linux下使用
//             图片上传的相对路径（因为相对路径放到页面上就可以显示图片）
            String path = "upload/pictures/teacher/" ;
            path=path+year+"/"+month+"/"+day+"/";


            String tomcat_path = System.getProperty( "user.dir" );
            System.out.println(tomcat_path);
            //获取Tomcat服务器所在路径的最后一个文件目录
            String bin_path = tomcat_path.substring(tomcat_path.lastIndexOf("/")+1,tomcat_path.length());
            System.out.println(bin_path);
            //若最后一个文件目录为bin目录，则服务器为手动启动

//             图片上传的绝对路径
            String aaa=System.getProperty("user.dir");
            String b =aaa.replaceAll("\\\\","/");
            String url = "";

            if(("bin").equals(bin_path)){//手动启动Tomcat时获取路径为：D:\Software\Tomcat-8.5\bin
                //获取保存上传图片的文件路径
                url = tomcat_path.substring(0,System.getProperty( "user.dir" ).lastIndexOf("/"))+"/webapps/faceSchool/"+path;
            }else{//服务中自启动Tomcat时获取路径为：D:\Software\Tomcat-8.5
                url = tomcat_path+"/webapps/faceSchool/"+path;
            }


//            //window
//            String path = "upload/pictures/teacher/" ;
//            path=path+year+"/"+month+"/"+day+"/";
//            String url = "C:/apache-tomcat-7.0.82/webapps/faceSchool/"+path;
            url=url.replaceAll("\\\\","/");

            System.out.println(url);

            File dir = new File(url);
            if(!dir.exists()) {
                dir.mkdirs();
            }

            url=url+System.currentTimeMillis()+"."+extension;
            path=path+System.currentTimeMillis()+"."+extension;

            // 上传图片
            pic.transferTo(new File(url));


            // 将相对路径写回（json格式）
            JSONObject jsonObject = new JSONObject();
            // 将图片上传到本地
            jsonObject.put("path", path);
            String imageUrl =url.replaceAll("\\\\","/");
            System.out.println(imageUrl);
            jsonObject.put("imageUrl", imageUrl);

            // 设置响应数据的类型json
            response.setContentType("application/json; charset=utf-8");
            // 写回
            response.getWriter().write(jsonObject.toString());

        } catch (Exception e) {
            throw new RuntimeException("服务器繁忙，上传图片失败");
        }
    }

    @RequestMapping(value="register.do",method=RequestMethod.POST)
    public void register(HttpServletRequest request,HttpServletResponse response,HttpSession session) throws IOException {
        String inputCode=request.getParameter("identify");
        String realCode=(String) session.getAttribute('"'+request.getParameter("username")+ '"');
        String msg;

        //验证码验证
        if(Integer.parseInt(realCode)!=Integer.parseInt(inputCode) || inputCode.trim().equals("") || inputCode.equals(null)){
            msg="{'status':2}";
        }else{
            msg=iTeacherService.insertTeacher(request);
        }
        JSONObject judge=new JSONObject(msg);
        PrintWriter out = response.getWriter();
        out.print(judge);
    }

    @RequestMapping(value = "signOut.do",method = RequestMethod.POST)
    public void signOut(HttpServletRequest request,HttpServletResponse response) throws IOException {
        PrintWriter out=response.getWriter();
        HttpSession session=request.getSession();
        session.setAttribute("teacherUsername","");
        String msg="{'msg':'OK'}";
        JSONObject judge=new JSONObject(msg);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "updatePassword.do", method = RequestMethod.POST)
    public void updatePassword(HttpServletRequest request,HttpServletResponse response, HttpSession session) throws IOException {
        PrintWriter out = response.getWriter();
        String inputCode=request.getParameter("identify");
        String realCode=(String) session.getAttribute('"'+request.getParameter("email")+ '"');
        Teacher teacher = iTeacherService.findTeacher(request);
        String msg = "";

        if(realCode==null || Integer.parseInt(inputCode)!=Integer.parseInt(realCode)){
            msg="{'status':0}";
        }else if(teacher == null){
            msg = "{'status':2}";
        }else {
            msg = iTeacherService.updatePassword(request);
        }

        JSONObject judge = new JSONObject(msg);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "getTeacher.do",method = RequestMethod.POST)
    public void getTeacher(HttpServletRequest request, HttpServletResponse response, HttpSession session) throws IOException {
        Teacher teacher=iTeacherService.findTeacherByEmail((String) session.getAttribute("teacherUsername"));
        PrintWriter out=response.getWriter();
        JSONObject judge=new JSONObject(teacher);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "updateProfile.do", method = RequestMethod.POST)
    public void updateProfile(HttpServletRequest request,HttpServletResponse response, HttpSession session) throws IOException {
        PrintWriter out = response.getWriter();
        String msg = "";
        msg = iTeacherService.updateProfile(request);
        JSONObject judge = new JSONObject(msg);
        out.print(judge);
        out.flush();
    }

    @RequestMapping(value = "updateClass.do", method = RequestMethod.POST)
    public void updateClass(HttpServletRequest request,HttpServletResponse response, HttpSession session) throws IOException {
        PrintWriter out = response.getWriter();
        String msg = "";
        msg = iTeacherService.updateClass(request);
        JSONObject judge = new JSONObject(msg);
        out.print(judge);
        out.flush();
    }

}
