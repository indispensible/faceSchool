package com.gang.service;

import com.gang.pojo.Student;
import org.json.JSONArray;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface IStudentService {

	int selectPicture(int id, HttpServletRequest request, HttpServletResponse response) throws IOException;

	int selectPicture(int id, HttpServletRequest request, HttpServletResponse response,MultipartFile image) throws IOException;

	String insertStudent(HttpServletRequest request, HttpServletResponse response);

	String loginStudent(String username, String password, HttpServletRequest request);

	Student findStudent(String username);

	Student findStudentBySId(int id);

	JSONArray findAllClasses(HttpServletRequest request);

	String updatePassword(HttpServletRequest request, HttpServletResponse response);

	String updateProfile(HttpServletRequest request, HttpServletResponse response);
}
