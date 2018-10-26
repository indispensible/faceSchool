package com.gang.common;

import java.io.*;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.baidu.aip.face.AipFace;
import com.youtu.Youtu;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.JSONArray;
import org.json.JSONObject;

import org.springframework.web.multipart.MultipartFile;
import sun.misc.BASE64Decoder;

public class mkDirAndPicture {
	
	//设置APPID/AK/SK
//	public static final String APP_ID = "10110205";
//	public static final String SECRET_ID = "AKIDFPOCwiivFPOBmCeJn8TcZOGxSoyxNYEj";
//	public static final String SECRET_KEY = "SimeSBidP5au35wbgS8FHAsOuTvMkyHe";
//	public static final String USER_ID = "1547554745";
	//百度
	private static final String APP_ID = "10440128";
	private static final String API_KEY = "vR6hPlM5By3m2eHgtiNDHgFF";
	private static final String SECRET_KEY = "Ile8Bg587cjhYEyi4FptqOgD7uUCEZfv";


	public  int faceRecognize(String basePath, String path, String picturePath) throws NoSuchAlgorithmException, IOException, KeyManagementException {
//		path=basePath+path;
//		picturePath=basePath+picturePath;
		path="/usr/tomcat/webapps/faceSchool/" + path;
		picturePath="/usr/tomcat/webapps/faceSchool/" + picturePath;
		System.out.println(path+"!!!");
		System.out.println(picturePath+"LLL");
//		Youtu faceYoutu = new Youtu(APP_ID, SECRET_ID, SECRET_KEY,Youtu.API_YOUTU_END_POINT,USER_ID);
////		JSONObject response = faceYoutu.FaceCompareUrl(path,picturePath);
//		JSONObject response = faceYoutu.FaceCompare(path,picturePath);
//		int score;
//		if(response.getInt("errorcode")==0){
//			score= (int) Math.round((Double) response.get("similarity"));
//		}else{
//			score=-1;
//		}
//		System.out.println(score);

		// 初始化一个AipFace
		AipFace client = new AipFace(APP_ID, API_KEY, SECRET_KEY);

		// 可选：设置网络连接参数
		client.setConnectionTimeoutInMillis(2000);
		client.setSocketTimeoutInMillis(60000);


		// 调用接口
		// 传入可选参数调用接口
		HashMap<String, String> options = new HashMap<String, String>();
		options.put("ext_fields", "qualities");
		options.put("image_liveness", ",faceliveness");
		options.put("types", "7,7");

		//参数为本地图片路径列表
		String path1 = picturePath;
		String path2 = path;
		ArrayList<String> imgPath = new ArrayList<String>();
		imgPath.add(path1);
		imgPath.add(path2);
		JSONObject res = client.match(imgPath, options);
		JSONArray res1 =new JSONArray(res.get("result").toString());
		JSONObject res2 =new JSONObject(res.get("ext_info").toString());
		int score= (int) Math.round((Double) res1.getJSONObject(0).get("score"));
		Double faceliveness = Double.valueOf(res2.get("faceliveness").toString().split(",")[1]);
		System.out.println(score);
		System.out.println(faceliveness);

		if(faceliveness>=0.093241){
			int aaaa = 1;
			System.out.println(aaaa);
		}else{
			score=-10;
		}

		return score;
	}


	public int mkByGang(HttpServletRequest request,HttpServletResponse response,String picturePath) throws IOException {
        try {
			request.setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;char=utf-8");
		
		// 获得磁盘文件条目工厂
	    DiskFileItemFactory factory = new DiskFileItemFactory();
	    // 获取文件需要上传到的路径
	    // String path = request.getRealPath("/upload");

		//linux下使用
		String path="upload/pictures/login/";
		String relativePath="";
		String tomcat_path = System.getProperty( "user.dir" );
		//获取Tomcat服务器所在路径的最后一个文件目录
		String bin_path = tomcat_path.substring(tomcat_path.lastIndexOf("/")+1,tomcat_path.length());
		//若最后一个文件目录为bin目录，则服务器为手动启动
		if(("bin").equals(bin_path)){//手动启动Tomcat时获取路径为：D:\Software\Tomcat-8.5\bin
			//获取保存上传图片的文件路径
			relativePath=path;
			path = tomcat_path.substring(0,System.getProperty( "user.dir" ).lastIndexOf("/")) +"/webapps/faceSchool/"+path;
		}else{//服务中自启动Tomcat时获取路径为：D:\Software\Tomcat-8.5
			relativePath=path;
			path = tomcat_path+"/webapps/faceSchool/"+path;
		}

		path=path.replaceAll("\\\\","/");

		//window下使用
//		String path="C:/apache-tomcat-7.0.82/webapps/faceSchool/upload/pictures/login/";
//		String relativePath="upload/pictures/login/";

		String path1 ="";
	    
	    SimpleDateFormat a=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String date=a.format(new Date());
		String year=date.substring(0,4);
		String month=date.substring(5,7);
		String day=date.substring(8,10);
		
		path=path+year+"/"+month+"/"+day+"/";
		relativePath=relativePath+year+"/"+month+"/"+day+"/";

	    // 如果文件夹不存在 将创建文件夹
	    if (!new File(path).exists()) {
	        new File(path).mkdirs();
	    }

	 // 如果没以下两行设置的话，上传大的 文件 会占用 很多内存，
        // 设置暂时存放的 存储室 , 这个存储室，可以和 最终存储文件 的目录不同
        /**
         * 原理 它是先存到 暂时存储室，然后在真正写到 对应目录的硬盘上， 按理来说 当上传一个文件时，其实是上传了两份，第一个是以 .tem
         * 格式的 然后再将其真正写到 对应目录的硬盘上
         */
        factory.setRepository(new File(path));
        // 设置 缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室
        factory.setSizeThreshold(1024 * 1024);

			try {

				// 获取表单的属性名字
				String name = "doc";

				// 获取用户具体输入的字符串 ，名字起得挺好，因为表单提交过来的是 字符串类型的
				String imgStr = request.getParameter(name);

				// base64解码并生成图片
				BASE64Decoder decoder = new BASE64Decoder();
				try {
					// Base64解码
					byte[] bytes = decoder.decodeBuffer(imgStr);
//
					// 生成jpeg图片
					String t1=System.currentTimeMillis()+"";

					path1=path+t1+".jpg";
					System.out.println(path1);
					relativePath=relativePath+t1+".jpg";

					OutputStream out = new FileOutputStream(path1);
					out.write(bytes);
					out.flush();
					out.close();
				} catch (Exception e) {
					e.printStackTrace();
				}

			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		String basePath=request.getParameter("basePath");

		int score = 0;
		mkDirAndPicture mk=new mkDirAndPicture();
		try {
			score = mk.faceRecognize(basePath,relativePath,picturePath);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		}
		return score;
	    
	    
		}


	public int mkByGang(HttpServletRequest request,HttpServletResponse response,String picturePath, MultipartFile image) throws IOException {
		try {
			request.setCharacterEncoding("utf-8");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;char=utf-8");

		// 获得磁盘文件条目工厂
		DiskFileItemFactory factory = new DiskFileItemFactory();

		//linux下使用
		String path="upload/pictures/login/";
		String relativePath="";
		String tomcat_path = System.getProperty( "user.dir" );
		//获取Tomcat服务器所在路径的最后一个文件目录
		String bin_path = tomcat_path.substring(tomcat_path.lastIndexOf("/")+1,tomcat_path.length());
		//若最后一个文件目录为bin目录，则服务器为手动启动
		if(("bin").equals(bin_path)){//手动启动Tomcat时获取路径为：D:\Software\Tomcat-8.5\bin
			//获取保存上传图片的文件路径
			relativePath=path;
			path = tomcat_path.substring(0,System.getProperty( "user.dir" ).lastIndexOf("/")) +"/webapps/faceSchool/"+path;
		}else{//服务中自启动Tomcat时获取路径为：D:\Software\Tomcat-8.5
			relativePath=path;
			path = tomcat_path+"/webapps/faceSchool/"+path;
		}

		path=path.replaceAll("\\\\","/");

		System.out.println(path);
		System.out.println(relativePath);

//		//window下使用
//		String path="C:/apache-tomcat-7.0.82/webapps/faceSchool/upload/pictures/login/";
//		String relativePath="upload/pictures/login/";

		String path1 ="";

		SimpleDateFormat a=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String date=a.format(new Date());
		String year=date.substring(0,4);
		String month=date.substring(5,7);
		String day=date.substring(8,10);

		path=path+year+"/"+month+"/"+day+"/";
		relativePath=relativePath+year+"/"+month+"/"+day+"/";

		// 如果文件夹不存在 将创建文件夹
		if (!new File(path).exists()) {
			new File(path).mkdirs();
		}

		// 如果没以下两行设置的话，上传大的 文件 会占用 很多内存，
		// 设置暂时存放的 存储室 , 这个存储室，可以和 最终存储文件 的目录不同
		/**
		 * 原理 它是先存到 暂时存储室，然后在真正写到 对应目录的硬盘上， 按理来说 当上传一个文件时，其实是上传了两份，第一个是以 .tem
		 * 格式的 然后再将其真正写到 对应目录的硬盘上
		 */
		factory.setRepository(new File(path));
		// 设置 缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室
		factory.setSizeThreshold(1024 * 1024);

		if(Integer.parseInt(request.getParameter("miniapp")) == 1){
			try{


				//自定义上传图片的名字为userId.jpg
				// 生成jpeg图片
				String t1=System.currentTimeMillis()+"";
				path1=path+t1+".jpg";
				System.out.println(path1);
				relativePath=relativePath+t1+".jpg";


				//真正写到磁盘上
				File file = new File(path1);

				image.transferTo(file);
			}catch (Exception e){
				e.printStackTrace();
			}
		}

		String basePath=request.getParameter("basePath");

		int score = 0;
		mkDirAndPicture mk=new mkDirAndPicture();
		try {
			score = mk.faceRecognize(basePath,relativePath,picturePath);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		}
		return score;


	}

}
