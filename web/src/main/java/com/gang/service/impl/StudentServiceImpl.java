package com.gang.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.gang.common.clawer.Clawer;
import com.gang.common.clawer.Main;
import com.gang.common.mkPictureUrl;
import com.gang.dao.CourseMapper;
import com.gang.dao.StudentMapper;
import com.gang.pojo.Course;
import com.gang.pojo.Student;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gang.common.mkDirAndPicture;
import com.gang.service.IStudentService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service("IStudentService")
public class StudentServiceImpl implements IStudentService {

	@Autowired
	private StudentMapper studentMapper;

	@Autowired
	private CourseMapper courseMapper;

	@Override
	public int selectPicture(int id, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String pictureUrl=studentMapper.selectPictureByPrimaryKey(id);
        mkDirAndPicture mkDirAndPicture=new mkDirAndPicture();
		int score=mkDirAndPicture.mkByGang(request, response,pictureUrl);
		System.out.println(score);
		return score;
	}

	@Override
	public int selectPicture(int id, HttpServletRequest request, HttpServletResponse response, MultipartFile image) throws IOException {
		String pictureUrl=studentMapper.selectPictureByPrimaryKey(id);
		mkDirAndPicture mkDirAndPicture=new mkDirAndPicture();
		int score=mkDirAndPicture.mkByGang(request, response,pictureUrl, image);
		System.out.println(score);
		return score;
	}

	@Override
	public String insertStudent(HttpServletRequest request, HttpServletResponse response){
		String picture="";
		try {
			picture = mkPictureUrl.mkByGang(request,response);
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println(picture+"!!!");
		Student currentUser=studentMapper.selectByUsername(request.getParameter("username"));
		Student currentMhUser=studentMapper.selectByMhUsername(request.getParameter("mhUsername"));
		if(currentUser==null && currentMhUser==null){

//			String username=request.getParameter("mhUsername");
//			String password="备用候选键";
//			String Captcha=request.getParameter("Captcha");
//
//			boolean judge= Main.checkLogWithFetch(username,password,Captcha);
			boolean judge = true;
			String success;

			if(judge){
				Student student=new Student(request.getParameter("username"),request.getParameter("password"),request.getParameter("iphone"),request.getParameter("mhUsername"),"备用候选键",picture,request.getParameter("realname"),"备用候选键");
				studentMapper.insertSelective(student);

				HttpSession session=request.getSession();
				String email=request.getParameter("username");
				Student student1=studentMapper.selectByUsername(email);
				int SId=student1.getId();
				String username1=student1.getUsername();
				session.setAttribute("StudentId",SId);
				session.setAttribute("username",username1);

				success="{'msg':"+2+",'realname':"+request.getParameter("username")+",'code':"+true+"}";
			}else{
				success="{'msg':"+3+",'realname':"+request.getParameter("username")+",'code':"+true+"}";
			}

			return success;

		}else{
			String failure="";
			if(currentUser==null){
				failure="{'msg':"+1+",'success':"+true+",'mhUsername':"+request.getParameter("mhUsername")+",'code':"+true+"}";
			}else{
				failure="{'msg':"+1+",'success':"+false+",'username':"+request.getParameter("username")+",'code':"+true+"}";
			}
			return failure;
		}
	}


	@Override
	public String loginStudent(String username, String password, HttpServletRequest request) {
		System.out.println(username);
		Student student=studentMapper.selectByUsername(username);
		String msg;
		if(student==null){
			msg="{'status':3}";
			return msg;
		}
		HttpSession session=request.getSession();
		int SId=student.getId();
		String username1=student.getUsername();
		session.setAttribute("StudentId",SId);
		session.setAttribute("username",username1);
		String realPassword=student.getPassword();
		if(password.equals(realPassword)){
			String sessionId = request.getSession().getId();
			msg="{'status':1,'sessionId':"+ sessionId +"}";
		}else{
			msg="{'status':2}";
		}
		return msg;
	}

	@Override
	public Student findStudent(String username) {
		Student student=studentMapper.selectByUsername(username);
		return student;
	}

	@Override
	public Student findStudentBySId(int id) {
		Student student = studentMapper.selectByPrimaryKey(id);
		return  student;
	}

	@Override
	public JSONArray findAllClasses(HttpServletRequest request) {
		String username=request.getParameter("mhUsername");
		List<Course> courses=courseMapper.findAllCourses(username);
		JSONArray judge=new JSONArray(courses);
		return judge;
	}

	@Override
	public String updatePassword(HttpServletRequest request, HttpServletResponse response) {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		Student stu = new Student(username, password);
		int judge = studentMapper.updateByEmailSelective(stu);
		String msg = "";
		if(judge > 0){
			msg = "{'status':1}";
		}else{
			msg = "{'status':3}";
		}
		return msg;
	}

	@Override
	public String updateProfile(HttpServletRequest request, HttpServletResponse response) {
		String username = request.getParameter("username");
		String mhUsername = request.getParameter("mhUsername");
		String iphone = request.getParameter("iphone");
		String realname = request.getParameter("realname");
		Student stu = new Student(username, iphone, mhUsername, realname);
		int judge = studentMapper.updateByEmailSelective(stu);
		String msg = "";
		if(judge > 0){
			msg = "{'status':1}";
		}else{
			msg = "{'status':2}";
		}
		return msg;
	}


}
