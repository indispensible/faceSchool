package com.gang.controller.protal;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.gang.common.ServerResponse;
import com.gang.common.clawer.Clawer;
import com.gang.common.clawer.Main;
import com.gang.common.sendEmail;
import com.gang.pojo.Student;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.gang.service.impl.StudentServiceImpl;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.io.PrintWriter;

@Controller
@RequestMapping("/login/")
public class StudentController {
	@Resource(name="IStudentService")
	private StudentServiceImpl iStudentService;
	
	@RequestMapping(value="checkApp.do",method=RequestMethod.POST)
	public void check(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "image", required = true) MultipartFile[] image) throws ServletException, IOException {
		MultipartFile file = image[0];
		int score=iStudentService.selectPicture(Integer.parseInt(request.getParameter("userId")), request, response, file);
		String msg="{'status':1,'msg':1,'data':"+score+"}";
		JSONObject jsonObject=new JSONObject(msg);
		PrintWriter out = response.getWriter();
		out.print(jsonObject);
	}

	@RequestMapping(value="check.do",method=RequestMethod.POST)
	public void check(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int score=iStudentService.selectPicture(Integer.parseInt(request.getParameter("userId")), request, response);
		String msg="{'status':1,'msg':1,'data':"+score+"}";
		JSONObject jsonObject=new JSONObject(msg);
		PrintWriter out = response.getWriter();
		out.print(jsonObject);
	}

	@RequestMapping(value="register.do",method=RequestMethod.POST)
	public void register(HttpServletRequest request,HttpServletResponse response,HttpSession session) throws IOException {
		String inputCode=request.getParameter("identify");
		String realCode=(String) session.getAttribute('"'+request.getParameter("username")+ '"');
		session.setAttribute("studentUsername",request.getParameter("username"));

		//验证码验证
		if(Integer.parseInt(realCode)==Integer.parseInt(inputCode)){
			String msg=iStudentService.insertStudent(request,response);
			JSONObject judge=new JSONObject(msg);
			PrintWriter out = response.getWriter();
			out.print(judge);
		}else{
			String msg="{'code':"+false+"}";
			JSONObject judge=new JSONObject(msg);
			PrintWriter out = response.getWriter();
			out.print(judge);
		}
	}

	@RequestMapping(value="login.do",method=RequestMethod.POST)
	public void login(HttpServletRequest request,HttpServletResponse response,HttpSession session) throws IOException {
//		String inputCode=request.getParameter("identify");
//		String realCode=(String) session.getAttribute('"'+request.getParameter("username")+ '"');
		session.setAttribute("studentUsername",request.getParameter("username"));
		PrintWriter out=response.getWriter();

//		if(realCode==null){
//			String msg="{'status':3}";
//			judge=new JSONObject(msg);
//			out.print(judge);
//		}else{
//			if(Integer.parseInt(inputCode)==Integer.parseInt(realCode)){
				String msg=iStudentService.loginStudent(request.getParameter("username"),request.getParameter("password"),request);
				JSONObject judge=new JSONObject(msg);
				out.print(judge);
//			}else{
//				String msg="{'status':0}";
//				judge=new JSONObject(msg);
//				out.print(judge);
//			}
//		}

	}

	@RequestMapping(value="sendEmail.do",method=RequestMethod.POST)
	public void sendEmail(HttpServletRequest request,HttpServletResponse response) throws IOException, MessagingException {
		Boolean email=sendEmail.sendEmailBy465(request.getParameter("username"),request.getParameter("code"));
		HttpSession session=request.getSession();
		session.setAttribute('"'+request.getParameter("username")+ '"',request.getParameter("code"));
		String msg="{'success':"+email+"}";
		JSONObject judge=new JSONObject(msg);
		PrintWriter out = response.getWriter();
		out.print(judge);
	}

	@RequestMapping(value = "signOut.do",method = RequestMethod.POST)
	public void signOut(HttpServletRequest request,HttpServletResponse response) throws IOException {
		PrintWriter out=response.getWriter();
		HttpSession session=request.getSession();
		session.setAttribute("studentUsername","");
		session.setAttribute("StudentId","");
		session.setAttribute("username","");
		String msg="{'msg':'OK'}";
		JSONObject judge=new JSONObject(msg);
		out.print(judge);
		out.flush();
	}

	@RequestMapping(value = "getCaptcha.do",method = RequestMethod.POST)
	public void getCaptcha(HttpServletResponse response) throws IOException {
		PrintWriter out=response.getWriter();
		Clawer clawer= Main.login();
//		String msg="{'msg':'ss'}";
		JSONObject judge=new JSONObject();
		judge.put("clawer",clawer);
		out.print(judge);
		out.flush();
	}

	@RequestMapping(value = "myClasses.do",method = RequestMethod.POST)
	public void myClasses(HttpServletRequest request,HttpServletResponse response) throws IOException {
		PrintWriter out=response.getWriter();
		JSONArray judge=iStudentService.findAllClasses(request);
		out.print(judge);
		out.flush();
	}

	@RequestMapping(value = "updatePassword.do", method = RequestMethod.POST)
	public void updatePassword(HttpServletRequest request,HttpServletResponse response, HttpSession session) throws IOException {
		PrintWriter out = response.getWriter();
		String inputCode=request.getParameter("identify");
		String realCode=(String) session.getAttribute('"'+request.getParameter("username")+ '"');
		Student stu = iStudentService.findStudent(request.getParameter("username"));
		String msg = "";

		if(realCode==null || Integer.parseInt(inputCode)!=Integer.parseInt(realCode)){
			 msg="{'status':0}";
		}else if(stu == null){
			msg = "{'status':2}";
		}else{
			msg = iStudentService.updatePassword(request, response);
		}

		JSONObject judge = new JSONObject(msg);
		out.print(judge);
		out.flush();
	}

	@RequestMapping(value = "updateProfile.do", method = RequestMethod.POST)
	public void updateProfile(HttpServletRequest request,HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		String msg = "";

		msg = iStudentService.updateProfile(request, response);

		JSONObject judge = new JSONObject(msg);
		out.print(judge);
		out.flush();
	}

	@RequestMapping(value = "findStudent.do", method = RequestMethod.POST)
	public void findStudent(HttpServletRequest request,HttpServletResponse response) throws IOException {
		PrintWriter out = response.getWriter();
		Student student = iStudentService.findStudentBySId(Integer.parseInt(request.getParameter("SId")));
		JSONObject judge = new JSONObject(student);
		out.print(judge);
		out.flush();
	}
}
