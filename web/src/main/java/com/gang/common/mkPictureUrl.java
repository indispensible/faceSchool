package com.gang.common;

import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import sun.misc.BASE64Decoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by 吕港 on 2017/11/2.
 * 注册专用
 */
public class mkPictureUrl {
    public static String mkByGang(HttpServletRequest request, HttpServletResponse response) throws IOException {
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


        //linux下使用
        String path="upload/pictures/register/";
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
//        String path="C:/apache-tomcat-7.0.82/webapps/faceSchool/upload/pictures/register/";
//        String relativePath="upload/pictures/login/";
//        String path1 ="";

        String path1 ="";

        SimpleDateFormat a=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date=a.format(new Date());
        String year=date.substring(0,4);
        String month=date.substring(5,7);
        String day=date.substring(8,10);

        path=path+year+"/"+month+"/"+day+"/";

        //window下使用
        relativePath=relativePath+year+"/"+month+"/"+day+"/";
        relativePath=relativePath.replaceAll("\\\\","/");

        //linux
        path=path.replaceAll("\\\\","/");


        // 如果没以下两行设置的话，上传大的 文件 会占用 很多内存，
        // 设置暂时存放的 存储室 , 这个存储室，可以和 最终存储文件 的目录不同
        /**
         * 原理 它是先存到 暂时存储室，然后在真正写到 对应目录的硬盘上， 按理来说 当上传一个文件时，其实是上传了两份，第一个是以 .tem
         * 格式的 然后再将其真正写到 对应目录的硬盘上
         */
        factory.setRepository(new File(path));
        // 设置 缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室
        factory.setSizeThreshold(1024 * 1024);



            // 获取表单的属性名字
            String name = "doc";

            // 获取用户具体输入的字符串 ，名字起得挺好，因为表单提交过来的是 字符串类型的
            String imgStr = request.getParameter(name);

            // base64解码并生成图片
            BASE64Decoder decoder = new BASE64Decoder();

                // Base64解码
                byte[] bytes = decoder.decodeBuffer(imgStr);
//
                // 生成jpeg图片
                String t1=System.currentTimeMillis()+"";

                path1=path;

                // 如果文件夹不存在 将创建文件夹
                if (!new File(path1).exists()) {
                    new File(path1).mkdirs();
                }
                path1=path1+t1+".jpg";
                relativePath=relativePath+t1+".jpg";
                System.out.println(path1);

                OutputStream out = new FileOutputStream(path1);
                out.write(bytes);
                out.flush();
                out.close();

                //linux
//                return path;

                //windows
                return relativePath;
            }
}
