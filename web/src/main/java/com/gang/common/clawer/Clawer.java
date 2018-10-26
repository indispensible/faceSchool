package com.gang.common.clawer;


import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class Clawer {
    private WebDriver driver=null;
    private Student student = null;
    private String chptcha = "";

    public Student getStudent() {
        return student;
    }

    public String getChptcha() {
        return chptcha;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public void setChptcha(String chptcha) {
        this.chptcha = chptcha;
    }

//    public Clawer() {
//        System.setProperty( "webdriver.firefox.bin" , "D:/Program Files/Mozilla Firefox/firefox.exe" );
//        System.setProperty("webdriver.gecko.driver", "geckodriver.exe");
//    }

    public Clawer(Student student) {
        System.setProperty( "webdriver.firefox.bin" , "D:/Program Files/Mozilla Firefox/firefox.exe" );
        System.setProperty("webdriver.gecko.driver", "C:/Users/吕港/Desktop/大三上/综合设计实验/爬虫/geckodriver.exe");
//        System.setProperty( "webdriver.firefox.bin" , "C:/Program Files (x86)/Mozilla Firefox/firefox.exe" );
//        System.setProperty("webdriver.gecko.driver", "C:/geckodriver.exe");
        driver = new FirefoxDriver();
        this.student = student;
    }

    public String getImage() throws IOException {
        // Login url may change in the future.
        driver.get("https://login.sufe.edu.cn/cas/login?service=http%3A%2F%2Fportal.sufe.edu.cn%2Fc%2Fportal%2Flogin%3Fredirect%3D%252Fc");
        WebElement codeImg = driver.findElement(By.id("codeImg")).findElement(By.tagName("img"));

        File screenshot = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
        BufferedImage fullImg = ImageIO.read(screenshot);
        Point point = codeImg.getLocation();
        int x = point.getX();
        int y = point.getY();
        int eleWidth = codeImg.getSize().getWidth();
        int eleHeight = codeImg.getSize().getHeight();
        BufferedImage eleScreenshot= fullImg.getSubimage(x, y, eleWidth, eleHeight);
        ImageIO.write(eleScreenshot, "png", screenshot);


        String path="C:/apache-tomcat-7.0.82/webapps/faceSchool/images/captcha/captcha.png";

//        //linux下
//        String path="images/captcha/captcha.png";
//        String tomcat_path = System.getProperty( "user.dir" );
//        //获取Tomcat服务器所在路径的最后一个文件目录
//        String bin_path = tomcat_path.substring(tomcat_path.lastIndexOf("/")+1,tomcat_path.length());
//        //若最后一个文件目录为bin目录，则服务器为手动启动
//        if(("bin").equals(bin_path)){//手动启动Tomcat时获取路径为：D:\Software\Tomcat-8.5\bin
//            //获取保存上传图片的文件路径
//            path = tomcat_path.substring(0,System.getProperty( "user.dir" ).lastIndexOf("/")) +"/webapps/faceSchool/"+path;
//        }else{//服务中自启动Tomcat时获取路径为：D:\Software\Tomcat-8.5
//            path = tomcat_path+"/webapps/faceSchool/"+path;
//        }
//
//        path=path.replaceAll("\\\\","/");

        String url = path; // url is set to be invariable for now. Maybe variable in the future.
        File screenshotLocation = new File(url);
        FileUtils.copyFile(screenshot, screenshotLocation);
        return url;
    }

    public Status login() {
        WebElement username = driver.findElement(By.id("username"));
        WebElement password = driver.findElement(By.id("password"));
        WebElement imageCodeName = driver.findElement(By.id("imageCodeName"));
        WebElement button = driver.findElement(By.id("submitButton")).findElement(By.tagName("button"));

        username.clear();
        username.sendKeys(student.getUsername());
        password.clear();
        password.sendKeys(student.getPassword());
        imageCodeName.clear();
        imageCodeName.sendKeys(chptcha);
        button.click();

        Status status = checkLogin();
        return status;
    }

    public Status checkLogin() {
        Status status = new Status();
        WebElement name = null;
        // Check if it is log in.
        try {
            name = driver.findElement(By.id("index_menu"));
        } catch (Exception e) {

        }
        if (name != null) {
            String username = name.findElement(By.tagName("a")).getText();
            String sql = "UPDATE student SET mh_name = " + username + " WHERE mh_username = " + student.getUsername();
            // A sql to update mh_name.
            status.setMessage("Welcome! User " + username);
        } else if (name == null) {
            status.setFlag(false);
            status.setMessage("Log in error.");
        }
        return status;
    }

    public List<Course> getCourses() {
        // Course url may change in the future.
        driver.get("http://portal.sufe.edu.cn/web/guest/appcenter?p_p_id=jigsawAppFront_WAR_jigsawAppFrontportlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_jigsawAppFront_WAR_jigsawAppFrontportlet_action=linkurl&_jigsawAppFront_WAR_jigsawAppFrontportlet_appid=46324");
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.switchTo().frame("iframeshow");
        String html = driver.getPageSource();
        WebElement table = driver.findElement(By.className("grid")).findElement(By.tagName("tbody"));
        List<WebElement> trs = table.findElements(By.tagName("tr"));
        List<Course> courses = new ArrayList<Course>();
        for (WebElement tr: trs) {
            List<WebElement> tds = tr.findElements(By.tagName("td"));
            Course course = new Course();
            course.setCourseID(tds.get(5).getText());
            course.setCourseName(tds.get(2).getText());
            course.setTeacher(tds.get(6).getText());
            course.setCourseTime(tds.get(12).getText());
            courses.add(course);
        }
        return courses;
    }
}
