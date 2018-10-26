package com.gang.common;

import org.apache.commons.mail.HtmlEmail;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Properties;

/**
 * Created by 吕港 on 2017/11/3.
 */
public class sendEmail {
    //邮箱验证码
    public static boolean sendEmail(String address,String code){
        try {
            HtmlEmail email = new HtmlEmail();//不用更改
            email.setHostName("smtp.163.com");//需要修改，126邮箱为smtp.126.com,163邮箱为smtp.163.com，QQ为smtp.qq.com
            email.setCharset("UTF-8");
            email.addTo(address);// 收件地址

            email.setFrom("m15801872696@163.com", "faceSchool");//此处填邮箱地址和用户名,用户名可以任意填写

            email.setAuthentication("m15801872696@163.com", "Lvgang1997MdL123");//此处填写邮箱地址和客户端授权码

            email.setSubject("来自faceSchool的邮件！");//此处填写邮件名，邮件名可任意填写

            email.setMsg(
                    "尊敬的用户您好,您本次注册的验证码是:"
                    + code
                    + "\n"+ "\n"
                    + "-------------------------------------\n"
                    + "很感谢您使用本系统，请尽快使用验证码，验证码将在半小时内失效！\n"
                    + "不要告诉他人验证码哦！！！\n"
                    + "-------------------------------------\n"
                    + "来自 faceSchool"
            );//此处填写邮件内容

            email.send();
            return true;
        }
        catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }



    public static boolean sendEmailBy465(String address,String code) throws MessagingException {
        final String fromEmailAddress="m15801872696@163.com";
        final String toEmailAddress=address;

        try{
            // Properties properties = System.getProperties();// 获取系统属性
            Properties props = new Properties();
            props .setProperty("mail.smtp.host", "smtp.163.com"); // 设置邮件服务器
            props.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            props.setProperty("mail.smtp.socketFactory.fallback", "false");
            props.setProperty("mail.smtp.port", "465");
            props.setProperty("mail.smtp.socketFactory.port", "465");
            props.put("mail.smtp.auth", "true");// 发送服务器需要身份验证
            final String username = "m15801872696@163.com";
            final String password = "Lvgang1997MdL123";

            Session session = Session.getDefaultInstance(props, new Authenticator(){
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }});
            Message msg = new MimeMessage(session);// 创建默认的 MimeMessage 对象
            try {
                msg.setFrom(new InternetAddress(fromEmailAddress,"faceSchool"));//设置发件
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            msg.setRecipient(Message.RecipientType.TO,new InternetAddress(toEmailAddress));//设置收件
            msg.setSubject("来自faceSchool的邮件！");
            msg.setText(
                    "尊敬的用户您好,您本次使用的验证码是:"
                            + code
                            + "\n"+ "\n"
                            + "-------------------------------------\n"
                            + "很感谢您使用本系统，请尽快使用验证码，验证码将在半小时内失效！\n"
                            + "不要告诉他人验证码哦！！！\n"
                            + "-------------------------------------\n"
                            + "来自 faceSchool"
            );
            msg.setSentDate(new Date());
            Transport transport = session.getTransport();
            transport.send(msg);
            transport.close();
            return true;
        }
        catch(Exception e){
            e.printStackTrace();
            return false;
        }
    }

}
