package com.gang.common;

import com.baidu.aip.face.AipFace;
import com.baidu.aip.nlp.AipNlp;
import junit.framework.Test;
import jxl.write.WriteException;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.logging.SimpleFormatter;


/**
 * Created by 吕港 on 2017/11/18.
 */
public class test {
        //设置APPID/AK/SK
        private static final String APP_ID = "11177554";
        private static final String API_KEY = "yR9K0BCwSYU5UKSTQqIAqaxU";
        private static final String SECRET_KEY = "4yuBLLa9BKaYn2gv6u7NEPVUlfpQVmGt";

    public static void main(String[] args) {
        // 初始化一个AipFace
        AipNlp client = new AipNlp(APP_ID, API_KEY, SECRET_KEY);

        // 可选：设置网络连接参数
        client.setConnectionTimeoutInMillis(2000);
        client.setSocketTimeoutInMillis(60000);


        String text = "苹果是一家伟大的公司";

        // 传入可选参数调用接口
        HashMap<String, Object> options = new HashMap<String, Object>();

 // 情感倾向分析
        JSONObject res = client.sentimentClassify(text);
        System.out.println(res.toString(2));
    }


}
