package com.gang.common;

/**
 * Created by 吕港 on 2017/12/2.
 */

import org.json.JSONObject;
import com.youtu.*;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

public class tengxunFace {
    public static final String APP_ID = "10110205";
    public static final String SECRET_ID = "AKIDFPOCwiivFPOBmCeJn8TcZOGxSoyxNYEj";
    public static final String SECRET_KEY = "SimeSBidP5au35wbgS8FHAsOuTvMkyHe";
    public static final String USER_ID = "1547554745";

    public static int faceRecognize(String basePath, String path, String picturePath) throws NoSuchAlgorithmException, IOException, KeyManagementException {
        path=basePath+path;
        picturePath=basePath+picturePath;
        Youtu faceYoutu = new Youtu(APP_ID, SECRET_ID, SECRET_KEY,Youtu.API_YOUTU_END_POINT,USER_ID);
        JSONObject response = faceYoutu.FaceCompareUrl(path,picturePath);
        int score;
        if(response.getInt("errorcode")==0){
            score= (int) response.get("similarity");
            return score;
        }else{
            score=-1;
            return score;
        }
    }
}
