package com.gang.common.clawer;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class Main_ex {
	public static void main(String[] aegs) throws IOException {
		System.setProperty( "webdriver.firefox.bin" , "D:/Program Files/Mozilla Firefox/firefox.exe" );
		System.setProperty("webdriver.gecko.driver", "C:/Users/吕港/Desktop/大三上/综合设计实验/爬虫/geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		
		driver.get("https://login.sufe.edu.cn/cas/login?service=http%3A%2F%2Fportal.sufe.edu.cn%2Fc%2Fportal%2Flogin%3Fredirect%3D%252Fc");
		WebElement username = driver.findElement(By.id("username"));
		WebElement password = driver.findElement(By.id("password"));
		WebElement imageCodeName = driver.findElement(By.id("imageCodeName"));
		WebElement box = driver.findElement(By.className("bj_box"));
		WebElement codeImg = driver.findElement(By.id("codeImg")).findElement(By.tagName("img"));
		WebElement button = driver.findElement(By.id("submitButton")).findElement(By.tagName("button"));
		
		String chptcha = "";
        File screenshot = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
        BufferedImage fullImg = ImageIO.read(screenshot);
        
        Point point1 = box.getLocation();
        Point point2 = codeImg.getLocation();
        int x = point2.getX();
        int y = point2.getY();
        int eleWidth = codeImg.getSize().getWidth();
        int eleHeight = codeImg.getSize().getHeight();
        BufferedImage eleScreenshot= fullImg.getSubimage(x, y, eleWidth, eleHeight);
        ImageIO.write(eleScreenshot, "png", screenshot);
        // ImageIO.write(fullImg, "png", screenshot);

        File screenshotLocation = new File("./image/chptcha.png");
        FileUtils.copyFile(screenshot, screenshotLocation);
        
		try {
			System.out.println("Please input captcha: ");
			InputStreamReader is = new InputStreamReader(System.in);
			BufferedReader br = new BufferedReader(is);
			chptcha = br.readLine();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		username.clear();
		username.sendKeys("2015111354");
		password.clear();
		password.sendKeys("QWERasdf1234");
		imageCodeName.clear();
		imageCodeName.sendKeys(chptcha);
		button.click();
		
		driver.get("http://portal.sufe.edu.cn/web/guest/appcenter?p_p_id=jigsawAppFront_WAR_jigsawAppFrontportlet&p_p_lifecycle=0&p_p_state=pop_up&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_jigsawAppFront_WAR_jigsawAppFrontportlet_action=linkurl&_jigsawAppFront_WAR_jigsawAppFrontportlet_appid=46324");	
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.switchTo().frame("iframeshow");
		WebElement table = driver.findElement(By.className("grid")).findElement(By.tagName("tbody"));
		List<WebElement> trs = table.findElements(By.tagName("tr"));
//		List<Course> courses = new ArrayList<>();
		for (WebElement tr: trs) {
			List<WebElement> tds = tr.findElements(By.tagName("td"));
        }
    }
}
